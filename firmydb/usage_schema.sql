-- Usage tracking table for FirmyDB
-- Tracks user exports, searches, and other actions

CREATE TABLE IF NOT EXISTS user_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL, -- 'csv_export', 'search', 'saved_search', etc.
  action_count INTEGER DEFAULT 1,
  metadata JSONB, -- Additional data (company count, filters used, etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_user_usage_user_id ON user_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_user_usage_action_type ON user_usage(action_type);
CREATE INDEX IF NOT EXISTS idx_user_usage_created_at ON user_usage(created_at);

-- Monthly usage summary view
CREATE OR REPLACE VIEW user_monthly_usage AS
SELECT 
  user_id,
  action_type,
  DATE_TRUNC('month', created_at) as month,
  SUM(action_count) as total_count
FROM user_usage
GROUP BY user_id, action_type, DATE_TRUNC('month', created_at);

-- User tier table (stores which tier user is on)
CREATE TABLE IF NOT EXISTS user_tiers (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tier_id VARCHAR(50) NOT NULL DEFAULT 'beta', -- 'beta', 'startup', 'pro'
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  subscription_status VARCHAR(50), -- 'active', 'canceled', 'past_due', etc.
  limits JSONB, -- Custom limits if needed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to get current month usage for a user
CREATE OR REPLACE FUNCTION get_user_monthly_usage(
  p_user_id UUID,
  p_action_type VARCHAR
)
RETURNS INTEGER AS $$
  SELECT COALESCE(SUM(action_count), 0)::INTEGER
  FROM user_usage
  WHERE user_id = p_user_id
    AND action_type = p_action_type
    AND created_at >= DATE_TRUNC('month', NOW())
    AND created_at < DATE_TRUNC('month', NOW()) + INTERVAL '1 month';
$$ LANGUAGE SQL STABLE;

-- Function to log usage
CREATE OR REPLACE FUNCTION log_user_usage(
  p_user_id UUID,
  p_action_type VARCHAR,
  p_action_count INTEGER DEFAULT 1,
  p_metadata JSONB DEFAULT '{}'::JSONB
)
RETURNS UUID AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO user_usage (user_id, action_type, action_count, metadata)
  VALUES (p_user_id, p_action_type, p_action_count, p_metadata)
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS (Row Level Security)
ALTER TABLE user_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tiers ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only see their own usage
CREATE POLICY "Users can view own usage"
  ON user_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own tier"
  ON user_tiers FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can do everything (for admin/API)
CREATE POLICY "Service role full access to usage"
  ON user_usage FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to tiers"
  ON user_tiers FOR ALL
  USING (auth.role() = 'service_role');

COMMENT ON TABLE user_usage IS 'Tracks user actions for usage limits and analytics';
COMMENT ON TABLE user_tiers IS 'Stores user subscription tier and Stripe info';
COMMENT ON FUNCTION get_user_monthly_usage IS 'Get total usage for current month for a specific action type';
COMMENT ON FUNCTION log_user_usage IS 'Log a user action for usage tracking';
