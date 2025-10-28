export const userFormOptions = [
  {
    id: 'purchaseFromMall',
    label: 'Purchase from Mall',
    description: 'Log what your character picked up from the marketplace.',
    fields: [
      {
        name: 'mention',
        label: 'Discord Mention',
        defaultValue: '@Adventurer',
      },
      {
        name: 'summary',
        label: 'Purchase Summary',
        defaultValue: 'as they restock consumables lost in transit',
      },
      {
        name: 'items',
        label: 'Purchased Items (format: Item (qty) - cost)',
        defaultValue:
          "Quaal's Feather Token, Tree (10) - 1k\nMedal of the Maze (5) - 25k\nPaper Bird (100) - 20k",
        multiline: true,
        minRows: 6,
      },
      {
        name: 'notes',
        label: 'Additional Notes',
        defaultValue: '',
        multiline: true,
        minRows: 2,
      },
    ],
    template: `{{purchaseHeader}}\n\n` +
      `{{itemsFormatted}}\n\n` +
      `Total: {{totalFormatted}}{{notesSection}}`,
  },
  {
    id: 'levelUpLog',
    label: 'Level Up Log',
    description: 'Document a character level-up and the key upgrades.',
    fields: [
      {
        name: 'characterName',
        label: 'Character Name',
        defaultValue: 'Hero name goes here.',
      },
      {
        name: 'newLevel',
        label: 'New Level (overall)',
        defaultValue: 'Level 9',
      },
      {
        name: 'newLevelClass',
        label: 'New Level Class',
        defaultValue: 'Rogue 5',
      },
      {
        name: 'newSubclass',
        label: 'New Subclass',
        defaultValue: 'None selected',
      },
      {
        name: 'newClassFeatures',
        label: 'New Class Feature(s)',
        defaultValue: '- Uncanny Dodge',
        multiline: true,
        minRows: 2,
        transform: 'list',
      },
      {
        name: 'asiOrFeat',
        label: 'ASI or New Feats',
        defaultValue: '- Skulker (gained +1 DEX, learned Darkness spell)',
        multiline: true,
        minRows: 3,
        transform: 'list',
      },
      {
        name: 'otherChoices',
        label: 'Other Level-Up Choices',
        defaultValue: '- Learned Counterspell (Warlock)\n- Added Deception proficiency',
        multiline: true,
        minRows: 3,
        transform: 'list',
      },
    ],
    template:
      `Character Name: {{characterName}}\n` +
      `New Level: {{newLevel}}\n` +
      `New Level Class: {{newLevelClass}}\n` +
      `New Subclass: {{newSubclass}}\n\n` +
      `New Class Feature:\n{{newClassFeatures}}\n\n` +
      `ASI or new Feats:\n{{asiOrFeat}}\n\n` +
      `Other Level-Up Choices:\n{{otherChoices}}`,
  },
  {
    id: 'createCharacter',
    label: 'Create Character',
    description: 'Generate a sharable card for a new adventurer.',
    fields: [
      {
        name: 'characterName',
        label: 'Character Name',
        defaultValue: 'Example: Ares Belmont',
      },
      {
        name: 'ruleSetVersion',
        label: 'Version (2014 or 2024)',
        defaultValue: '2024',
      },
      {
        name: 'classes',
        label: 'Class(es) (starting at level 3)',
        defaultValue: 'Fighter 5 / Wizard 1',
      },
      {
        name: 'subclass',
        label: 'Subclass (if any)',
        defaultValue: 'Eldritch Knight',
      },
      {
        name: 'raceAndAsi',
        label: 'Race & Racial ASI Bonuses',
        defaultValue: 'Half-Elf (+2 CHA, +1 DEX, +1 CON); choosing Tasha\'s origins.',
        multiline: true,
        minRows: 2,
      },
      {
        name: 'size',
        label: 'Size',
        defaultValue: 'Medium',
      },
      {
        name: 'alignment',
        label: 'Alignment',
        defaultValue: 'Neutral Good',
      },
      {
        name: 'background',
        label: 'Background (include spells/spellcasting trait)',
        defaultValue: 'Passageways Archivist — grants Message cantrip and keen mind.',
        multiline: true,
        minRows: 3,
      },
      {
        name: 'strScore',
        label: 'STR (base score)',
        defaultValue: '8',
      },
      {
        name: 'dexScore',
        label: 'DEX (base score)',
        defaultValue: '8',
      },
      {
        name: 'conScore',
        label: 'CON (base score)',
        defaultValue: '8',
      },
      {
        name: 'intScore',
        label: 'INT (base score)',
        defaultValue: '8',
      },
      {
        name: 'wisScore',
        label: 'WIS (base score)',
        defaultValue: '8',
      },
      {
        name: 'chaScore',
        label: 'CHA (base score)',
        defaultValue: '8',
      },
      {
        name: 'languagesRace',
        label: 'Race',
        defaultValue: '',
      },
      {
        name: 'languagesClass',
        label: 'Class',
        defaultValue: '',
      },
      {
        name: 'languagesBackground',
        label: 'Background',
        defaultValue: '',
      },
      {
        name: 'skillsRace',
        label: 'Race',
        defaultValue: '',
      },
      {
        name: 'skillsClass',
        label: 'Class',
        defaultValue: '',
      },
      {
        name: 'skillsBackground',
        label: 'Background',
        defaultValue: '',
      },
      {
        name: 'toolsRace',
        label: 'Race',
        defaultValue: '',
      },
      {
        name: 'toolsClass',
        label: 'Class',
        defaultValue: '',
      },
      {
        name: 'toolsBackground',
        label: 'Background',
        defaultValue: '',
      },
      {
        name: 'expertise',
        label: 'Expertise (if any)',
        defaultValue: 'Stealth, Investigation',
        multiline: true,
        minRows: 2,
      },
      {
        name: 'feats',
        label: 'Feats (label source)',
        defaultValue: 'Fey Touched (R) — Misty Step & Hex prepared.',
        multiline: true,
        minRows: 2,
      },
      {
        name: 'otherChoices',
        label: 'Other Class Choices',
        defaultValue: 'Warlock Invocations: Agonizing Blast (C), Eldritch Mind (C).',
        multiline: true,
        minRows: 4,
      },
    ],
    template:
      `**Name:** {{characterName}}\n` +
      `**Version:** {{ruleSetVersion}}\n\n` +
      `**Class(es):** {{classes}}\n` +
      `**Subclass:** {{subclass}}\n\n` +
      `**Race & Racial ASI Bonuses:**  {{raceAndAsi}}\n` +
      `(Specify subrace.)\n\n` +
      `**Size:**  {{size}}\n` +
      `**Alignment:**  {{alignment}}\n\n` +
      `───────────────────────────────\n\n` +
      `**Background:**  {{background}}\n` +
      `(List spells and spellcasting trait selected.)\n\n` +
      `**Core Stats (without bonuses):**\n` +
      "`STR {{strScore}}` | `DEX {{dexScore}}` | `CON {{conScore}}` | `INT {{intScore}}` | `WIS {{wisScore}}` | `CHA {{chaScore}}`\n" +
      `[35 point buy with calculator](https://chicken-dinner.com/5e/5e-point-buy.html)\n\n` +
      `**Source Labels:**\n` +
      `R = Race | C = Class | B = Background\n` +
      `───────────────────────────────\n` +
      `**Languages:**\n` +
      `R: {{languagesRace}}\n` +
      `C: {{languagesClass}}\n` +
      `B: {{languagesBackground}}\n\n` +
      `**Proficient Skills:**\n` +
      `R: {{skillsRace}}\n` +
      `C: {{skillsClass}}\n` +
      `B: {{skillsBackground}}\n\n` +
      `**Proficient Tools:**\n` +
      `R: {{toolsRace}}\n` +
      `C: {{toolsClass}}\n` +
      `B: {{toolsBackground}}\n\n` +
      `**Expertise:** {{expertise}}\n` +
      `**Feat(s):**  {{feats}}\n\n` +
      `───────────────────────────────\n\n` +
      `**Other Class Choices:**  {{otherChoices}}\n`,
  },
]
