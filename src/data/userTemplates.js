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
