export const dmFormOptions = [
  {
    id: 'lookingToHost',
    label: 'Looking to Host',
    description: 'Pitch a new session and recruit players quickly.',
    sections: [
      {
        id: 'session-details',
        title: 'Session Details',
        description: 'Fill in the essentials players will see first.',
        icon: 'sword',
        fields: ['sessionName', 'description'],
        layout: [
          [{ field: 'sessionName', span: 10 }],
          [{ field: 'description', span: 10 }],
        ],
      },
      {
        id: 'schedule',
        title: 'Schedule',
        description: 'Share timing, scope, and expectations for the table.',
        icon: 'calendar',
        fields: [
          'startTime',
          'expectedDuration',
          'expectedApl',
          'difficulty',
          'sessionFocus',
          'houseRules',
        ],
        layout: [
          [{ field: 'startTime', span: 12 }],
          [{ field: 'expectedDuration', span: 10 }],
          [{ field: 'expectedApl', span: 10 }],
          [{ field: 'difficulty', span: 10 }],
          [{ field: 'sessionFocus', span: 10 }],
          [{ field: 'houseRules', span: 10 }],
        ],
      },
      {
        id: 'players',
        title: 'Players',
        description: 'Let folks know how to join and who is already aboard.',
        icon: 'users',
        fields: ['playerCount', 'toJoin', 'players'],
        layout: [
          [{ field: 'playerCount', span: 10 }],
          [{ field: 'toJoin', span: 10 }],
          [{ field: 'players', span: 10 }],
        ],
      },
    ],
    fields: [
      { name: 'sessionName', label: 'Session Name', defaultValue: 'Name your one-shot or arc.' },
      {
        name: 'description',
        label: 'Description',
        defaultValue: 'Highlight the premise, intended tone, and any content warnings.',
        multiline: true,
        minRows: 4,
      },
      {
        name: 'startTime',
        label: 'Start Time',
        type: 'datetime',
        defaultValue: 'Monday, October 27, 2025 11:05 AM which is in 14 minutes',
      },
      {
        name: 'expectedDuration',
        label: 'Expected Duration',
        defaultValue: 'Estimate how long you expect to play.',
      },
      {
        name: 'expectedApl',
        label: 'Expected APL',
        defaultValue: 'Average Player Level the adventure targets.',
      },
      {
        name: 'sessionFocus',
        label: 'Session Focus (State if NSFW is Included)',
        defaultValue: 'Explain the focus and explicitly state if NSFW content is present.',
        multiline: true,
        minRows: 3,
      },
      {
        name: 'difficulty',
        label: 'Difficulty (Include Perma-Death Status)',
        defaultValue: 'State the danger level and whether perma death is on or off.',
        multiline: true,
        minRows: 2,
      },
      {
        name: 'houseRules',
        label: 'House Rules',
        defaultValue: '- Summarize any custom rules or expectations.\n- Include safety tools in use.',
        multiline: true,
        minRows: 3,
        transform: 'list',
      },
      {
        name: 'playerCount',
        label: 'Player Count',
        defaultValue: 'How many players you are recruiting.',
      },
      {
        name: 'toJoin',
        label: 'To Join',
        defaultValue: 'Explain how players should sign up or reach out.',
        multiline: true,
        minRows: 2,
      },
      {
        name: 'players',
        label: 'Players (Ping TRP Players)',
        defaultValue: '- @PlayerName — include ping and role if needed.',
        multiline: true,
        minRows: 3,
        transform: 'list',
      },
    ],
    template: `**Session name:** {{sessionName}}\n\n` +
      `**Description:**\n{{description}}\n\n` +
      `**Start time:** {{startTime}}\n\n` +
      `**Expected duration:** {{expectedDuration}}\n\n` +
      `**Expected APL:** {{expectedApl}}\n\n` +
      `**Difficulty:**\n{{difficulty}}\n\n` +
      `**Session Focus:**\n{{sessionFocus}}\n\n` +
      `**House rules:**\n{{houseRules}}\n\n` +
      `**Player count:** {{playerCount}}\n\n` +
      `**To join:** {{toJoin}}\n\n` +
      `**Players:**\n{{players}}`,
  },
  {
    id: 'sessionLog',
    label: 'Session Log',
    description: 'Capture the highlights of a completed session.',
    sections: [
      {
        id: 'summary',
        title: 'Session Summary',
        description: 'Document what the table played and who was involved.',
        fields: ['sessionName', 'date', 'hoursPlayed', 'participants'],
        layout: [
          [{ field: 'sessionName' }],
          [
            { field: 'date', span: 6 },
            { field: 'hoursPlayed', span: 6 },
          ],
          [{ field: 'participants' }],
        ],
      },
      {
        id: 'stats',
        title: 'Session Stats',
        description: 'Quick references for length, challenge, and rewards.',
        fields: ['apl', 'playerLoot'],
        layout: [
          [
            { field: 'apl', span: 4 },
            { field: 'playerLoot', span: 8 },
          ],
        ],
      },
      {
        id: 'notes',
        title: 'Narrative Notes',
        description: 'Optional recap field to capture what happened for posterity.',
        fields: ['synopsis'],
      },
    ],
    fields: [
      { name: 'sessionName', label: 'Session Name', defaultValue: 'Give the session a memorable title.' },
      {
        name: 'date',
        label: 'Date',
        defaultValue: 'Add the real-world or in-game date.',
        width: 'half',
      },
      {
        name: 'hoursPlayed',
        label: 'Number of Hours Played',
        defaultValue: 'How long did the session run?',
        width: 'half',
      },
      {
        name: 'participants',
        label: 'Participants',
        defaultValue: '- Character name (player) — role or class.\n- Include DM or guest NPCs if relevant.',
        multiline: true,
        minRows: 3,
        transform: 'list',
      },
      {
        name: 'apl',
        label: 'APL (Average Player Level)',
        defaultValue: 'State the average level of the party.',
        width: 'half',
      },
      {
        name: 'playerLoot',
        label: 'Player Loot',
        defaultValue: '- Gold \n- Magic items or boons earned.',
        multiline: true,
        minRows: 3,
        transform: 'list',
      },
      {
        name: 'synopsis',
        label: 'Synopsis (Optional)',
        defaultValue: 'Briefly recap what happened, optional but helpful.',
        multiline: true,
        minRows: 4,
      },
    ],
    template: `**Session Name:** {{sessionName}}\n\n` +
      `**Participants:**\n{{participants}}\n\n` +
      `**Date:** {{date}}\n\n` +
      `**Number of hours played:** {{hoursPlayed}}\n\n` +
      `**APL (Average Player Level):** {{apl}}\n\n` +
      `**Player Loot:** {{playerLoot}}\n\n` +
      `**Synopsis: (optional)**\n{{synopsis}}\n\n` +
      `-# [DM & Player Feedback Form](https://docs.google.com/forms/d/e/1FAIpQLSfNB-e4_Ee-iZBX_jpjvVUiHoKUkl41F7FyvCUkIQ7AL8FcFA/viewform?usp=dialog)`,
  },
]
