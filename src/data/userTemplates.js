export const userFormOptions = [
  {
    id: 'purchaseFromMall',
    label: 'Purchase from Mall',
    description: 'Log what your character picked up from the marketplace.',
    fields: [
      { name: 'characterName', label: 'Character Name', defaultValue: 'Adventurer name goes here.' },
      {
        name: 'party',
        label: 'Adventuring Party / Affiliations',
        defaultValue: 'Mention the party, faction, or patrons involved.',
      },
      {
        name: 'items',
        label: 'Items Acquired (one per line)',
        defaultValue: '- Healing Potion x2 — 100 gp.\n- Bag of Holding — 400 gp.',
        multiline: true,
        minRows: 3,
        transform: 'list',
      },
      {
        name: 'notes',
        label: 'Purchase Notes',
        defaultValue: 'Add why the purchase was needed or who approved it.',
        multiline: true,
        minRows: 3,
      },
    ],
    template: `## Purchase Receipt: {{characterName}}\n\n` +
      `**Party / Affiliations:** {{party}}\n\n` +
      `### Items Acquired\n{{items}}\n\n` +
      `**Notes**\n{{notes}}`,
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
        label: 'New Level / Class Split',
        defaultValue: 'Level 6 (Paladin 4 / Sorcerer 2).',
      },
      {
        name: 'date',
        label: 'Date Achieved',
        defaultValue: 'Mark the session date or downtime when this happened.',
      },
      {
        name: 'hpChanges',
        label: 'Hit Point Changes',
        defaultValue: 'HP increased by 7; max HP now 54.',
        multiline: true,
        minRows: 2,
      },
      {
        name: 'features',
        label: 'New Class Features / Feats',
        defaultValue: '- Aura of Protection (Paladin).\n- Metamagic: Quickened Spell.',
        multiline: true,
        minRows: 3,
        transform: 'list',
      },
      {
        name: 'spells',
        label: 'New or Upgraded Spells',
        defaultValue: '- Revivify added to prepared list.\n- Fireball now available at 3rd level.',
        multiline: true,
        minRows: 3,
        transform: 'list',
      },
      {
        name: 'downtime',
        label: 'Downtime Notes / Roleplay Beats',
        defaultValue: 'Describe important scenes or narrative consequences.',
        multiline: true,
        minRows: 3,
      },
    ],
    template: `# Level Up Log: {{characterName}}\n\n` +
      `**New Level:** {{newLevel}}\n\n` +
      `**Date Achieved:** {{date}}\n\n` +
      `**Hit Points:**\n{{hpChanges}}\n\n` +
      `## New Features & Feats\n{{features}}\n\n` +
      `## Spell Updates\n{{spells}}\n\n` +
      `## Downtime & Roleplay\n{{downtime}}`,
  },
  {
    id: 'createCharacter',
    label: 'Create Character',
    description: 'Generate a sharable card for a new adventurer.',
    fields: [
      {
        name: 'characterName',
        label: 'Character Name',
        defaultValue: 'Insert your character name.',
      },
      {
        name: 'ancestry',
        label: 'Ancestry / Lineage',
        defaultValue: 'Describe race, lineage, or heritage elements.',
      },
      {
        name: 'characterClass',
        label: 'Class & Subclass',
        defaultValue: 'Bard (College of Lore) or similar breakdown.',
      },
      {
        name: 'background',
        label: 'Background',
        defaultValue: 'What life did your character lead before adventuring?',
        multiline: true,
        minRows: 2,
      },
      {
        name: 'traits',
        label: 'Personality Traits & Ideals',
        defaultValue: '- Quick with a joke, but loyal to a fault.\n- Believes knowledge should be shared freely.',
        multiline: true,
        minRows: 3,
        transform: 'list',
      },
      {
        name: 'bonds',
        label: 'Bonds & Flaws',
        defaultValue: '- Owes a life debt to the local clergy.\n- Dangerously curious about forbidden lore.',
        multiline: true,
        minRows: 3,
        transform: 'list',
      },
      {
        name: 'backstory',
        label: 'Backstory',
        defaultValue: 'Write the journey that led you to take up adventuring.',
        multiline: true,
        minRows: 4,
      },
    ],
    template: `# Character Profile: {{characterName}}\n\n` +
      `**Ancestry:** {{ancestry}}\n\n` +
      `**Class & Subclass:** {{characterClass}}\n\n` +
      `**Background:**\n{{background}}\n\n` +
      `## Personality Traits & Ideals\n{{traits}}\n\n` +
      `## Bonds & Flaws\n{{bonds}}\n\n` +
      `## Backstory\n{{backstory}}`,
  },
]
