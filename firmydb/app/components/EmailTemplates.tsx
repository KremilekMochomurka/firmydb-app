import React, { useState } from 'react'

interface Props {
  onClose: () => void
}

const templates = [
  {
    id: 'intro',
    name: 'Úvodní představení',
    subject: 'Spolupráce s {{company_name}}',
    body: `Dobrý den,

jmenuji se {{your_name}} a pracuji ve firmě {{your_company}}.

Oslovuji Vás, protože se zabýváme {{your_business}} a zaujala nás Vaše společnost {{company_name}}.

Myslíte, že bychom mohli být pro Vás zajímaví? Rád bych Vám představil, jak můžeme pomoci s {{value_proposition}}.

Hodil by se Vám krátký hovor (15 minut)? Jsem k dispozici tento týden v {{time_slots}}.

S pozdravem,
{{your_name}}
{{your_title}}
{{your_email}} | {{your_phone}}`
  },
  {
    id: 'follow-up',
    name: 'Follow-up po prvním emailu',
    subject: 'RE: Spolupráce s {{company_name}}',
    body: `Dobrý den,

jen bych rád navázal na můj předchozí email ohledně {{topic}}.

Chápu, že jste zaneprázdněni, ale chtěl bych se ujistit, že jste dostal/a moji zprávu.

Případně - pokud teď není vhodná doba, kdy by bylo lepší se ozvat?

Těším se na Vaši odpověď.

S pozdravem,
{{your_name}}`
  },
  {
    id: 'value-prop',
    name: 'Value Proposition',
    subject: 'Jak ušetřit {{benefit}} - {{company_name}}',
    body: `Dobrý den,

všiml jsem si, že {{company_name}} se zabývá {{industry}}.

Pomáháme firmám jako je ta Vaše {{value_proposition}}. Naši klienti obvykle:

✓ {{benefit_1}}
✓ {{benefit_2}}
✓ {{benefit_3}}

Zajímalo by Vás zjistit, jak bychom mohli pomoci i Vám?

Připravil jsem krátké demo ({{demo_link}}) nebo můžeme naplánovat hovor.

Co říkáte?

S pozdravem,
{{your_name}}`
  },
  {
    id: 'meeting-request',
    name: 'Žádost o meeting',
    subject: 'Meeting: {{topic}} - {{date_suggestion}}',
    body: `Dobrý den,

děkuji za zájem o {{topic}}.

Rád bych s Vámi probral detaily a ukázal, jak {{value_proposition}}.

Vyhovoval by Vám některý z těchto termínů?
• {{option_1}}
• {{option_2}}
• {{option_3}}

Meeting bude trvat cca {{duration}} minut a proběhne {{format}}.

Pokud Vám žádný termín nevyhovuje, dejte mi vědět, kdy máte čas.

Těším se na setkání!

S pozdravem,
{{your_name}}`
  },
  {
    id: 'case-study',
    name: 'Case Study / Reference',
    subject: 'Jak jsme pomohli {{similar_company}}',
    body: `Dobrý den,

chtěl bych s Vámi sdílet případovou studii, jak jsme pomohli {{similar_company}} - firmě podobné {{company_name}}.

**Výzva:** {{challenge}}
**Řešení:** {{solution}}
**Výsledek:** {{result}}

Myslím, že bychom mohli dosáhnout podobných výsledků i pro Vás.

Mohl bych Vám poslat kompletní case study? Nebo rovnou naplánovat hovor?

S pozdravem,
{{your_name}}`
  }
]

export default function EmailTemplates({ onClose }: Props) {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    const fullTemplate = `Subject: ${selectedTemplate.subject}\n\n${selectedTemplate.body}`
    navigator.clipboard.writeText(fullTemplate)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">📧 Email Templates</h2>
            <p className="text-sm text-gray-600">Ready-to-use templates for B2B outreach</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Sidebar - Template List */}
          <div className="w-64 border-r border-gray-200 overflow-y-auto bg-gray-50">
            <div className="p-4">
              {templates.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition ${
                    selectedTemplate.id === template.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main - Template Preview */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject:
              </label>
              <input
                type="text"
                value={selectedTemplate.subject}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body:
              </label>
              <textarea
                value={selectedTemplate.body}
                readOnly
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>💡 Tip:</strong> Nahraďte {'{{'} placeholders {'}'} svými údaji před odesláním.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                {copied ? '✓ Zkopírováno!' : '📋 Kopírovat template'}
              </button>
              <button
                onClick={() => {
                  const subject = selectedTemplate.subject
                  const body = selectedTemplate.body
                  window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Otevřít v emailu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
