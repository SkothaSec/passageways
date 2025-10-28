export const resourceLinks = [
  {
    title: '5etools Compendium',
    description: 'Reference spells, items, stat blocks, and adventures with lightning-fast search.',
    url: 'https://5e.tools/',
  },
  {
    title: "D&D 5e System Reference Document",
    description: 'Official SRD containing core rules, subclasses, and spells released for open play.',
    url: 'https://dnd.wizards.com/resources/systems-reference-document',
  },
  {
    title: 'D&D Beyond Basic Rules',
    description: 'Concise explanations for checks, combat, and conditions—great for onboarding new players.',
    url: 'https://www.dndbeyond.com/sources/basic-rules',
  },
  {
    title: 'GM Binder Templates',
    description: 'Build gorgeous homebrew supplements and handouts with community-made templates.',
    url: 'https://www.gmbinder.com/',
  },
  {
    title: 'Roll20 Safety Toolkit',
    description: 'Session zero guidelines and safety mechanics to help keep every table welcoming.',
    url: 'https://roll20.net/safety-tools',
  },
]

export const faqItems = [
  {
    question: 'Character Import',
    answers: [
      {
        text: 'For import characters where you have the same characters with different rulesets, you may only choose the progression on either 5e or 5.5e and not both.',
        link: {
          href: 'https://discord.com/channels/1395026390499463188/1395182225221222520/1418577449272217683',
          label: 'discord url',
        },
      },
      {
        text: 'Lesson learned. Empty your DTP and prestige BEFORE importing. No seriously, this should be one of disclaimers.',
        bold: true,
        after: ' (Thanks <@541563074835120139>)',
      },
      {
        text: 'You keep all of your previous items, gold, and equipment when you import a character. No boons. No homebrew. No persistent effects. All items with piety revert back to their dormant state.',
      },
    ],
  },
  {
    question: 'About Shared Drives',
    answers: [
      {
        text: "As of typing this we are in the process of figuring out the automation process for google drive after you've submitted your google forms. Please check your DMs or emails for a sharing message.",
        link: {
          href: 'https://discord.com/channels/1395026390499463188/1395182225221222520/1418579942052069468',
          label: 'discord url',
        },
      },
    ],
  },
  {
    question: 'Character Creation',
    answers: [
      {
        text: 'As of typing this, we are keeping 2024 content strictly 2024 only until we figure out how to balance with backwards compatibility, so yes you cannot pick those unless they have a reprinted version for it.',
        link: {
          href: 'https://discord.com/channels/1395026390499463188/1395182225221222520/1418619362536853594',
          label: 'discord url',
        },
      },
    ],
  },
  {
    question: 'Becoming a DM',
    answers: [
      {
        text: 'You need to do 5 live sessions (either voice or TRP, up to your choice) to become a full DM.',
        link: {
          href: 'https://discord.com/channels/1395026390499463188/1395182225221222520/1418693751693643848',
          label: 'discord url',
        },
      },
    ],
  },
]

export const serverContentGroups = [
  {
    id: 'status-legend',
    title: 'Status Legend',
    description: [
      {
        text: 'We label verdicts across all content groups with the icons below. New sources may take a few days to review.',
      },
    ],
    statusLegend: [
      {
        icon: '✅',
        label: 'Approved',
        text: 'Fully allowed for use.',
      },
      {
        icon: '⚠️',
        label: 'Modified',
        text: 'Allowed with changes or limitations.',
      },
      {
        icon: '❌',
        label: 'Removed',
        text: 'Not allowed in The Passageways.',
      },
    ],
  },
  {
    id: 'homebrew',
    type: 'homebrew',
    title: 'Homebrew content',
    description: [
      {
        text: 'In this forum, you will find UA material and homebrew that is submitted through ',
        link: {
          href: 'https://discord.com/channels/1395026390499463188/1410774181661904996',
          label: 'Guardian UA & Homebrew Submissions',
        },
        suffix: '.',
      },
      {
        text: 'Any changes made will be added below the appropriate source. UA not listed in this forum is not approved to be used. ',
        link: {
          href: 'https://docs.google.com/spreadsheets/d/1HUCpmP2II7_X0A_lbcZvSwCLxBa-wnbnrOzIeqRTApY/edit?usp=sharing',
          label: 'Passageways Open Playtest Sheet',
        },
        suffix: '.',
      },
    ],
    sections: [
      {
        id: 'homebrew-steinhardts-guide',
        heading: "Steinhardt's Guide to the Eldritch hunt ⚠️",
        bullets: [
          'The **Jaeger Class** is under prestige Lock. Requirements for Jaeger are also **13 Dex & 13 INT**.',
          'Blade of Radiance Rogue and Living Nightmare Fighter are under Prestige Lock.',
        ],
      },
      {
        id: 'homebrew-backgrounds-feats',
        heading: 'Backgrounds and Feats',
        bullets: [
          '**STEINHARDT BACKGROUNDS ARE BANNED** ❌',
          '**Steinhardt feats approved with exception to the following:** ⚠️',
          'Marksman, Sharpshooter, Great weapon adept.',
        ],
      },
      {
        id: 'homebrew-items',
        heading: 'Items',
        bullets: [
          '**FIREARMS ARE YET TO BE ADDED** ⚠️',
          'Bead of forbiddance banned ❌',
          'Heart of darkness and holy tonics banned ❌',
          '**Eldritch Carvings yet to be added** ⚠️',
          '**Thirsting Épée Sanguine** – In regards to its necrotic healing feature, only the healing from the necrotic damage BY THIS WEAPON being the 2d8 etc heals you. Not necrotic damage from other sources. ⚠️',
          '**Shard of Moonlight** – Loses its *Light* property when in transformed state.',
        ],
      },
    ],
  },
  {
    id: 'partnered-content',
    title: 'Partnered Content',
    sections: [
      {
        id: 'partnered-dnd-rick-and-morty',
        heading: 'Dungeons & Dragons vs. Rick and Morty ❌',
      },
      {
        id: 'partnered-explorers-guide-wildemount',
        heading: "Explorer's Guide to Wildemount ⚠️",
        bullets: [
          "Wizard's **Chronurgist** features are modified.",
          "**Arcane Abeyance** requires the person casting through the bead to use the spell's original casting time, instead of an action.",
          '**Convergent Future** can be used once per long rest, instead of having multiple uses through exhaustion.',
        ],
      },
      {
        id: 'partnered-minecraft-creatures',
        heading: 'Monstrous Compendium Vol. 3: Minecraft Creatures ❌',
      },
      {
        id: 'partnered-taldorei-reborn',
        heading: "Tal'Dorei Campaign Setting: Reborn ⚠️",
        bullets: [
          "**Bard's College of Tragedy** features are modified.",
          '**Nimbus of Pathos** cannot be used on conjured or shapechanged creatures.',
          "Monk's **Cobalt Soul** features are modified.",
          "For **Extract Aspects**, the ability to learn all of a creature's damage vulnerabilities, damage resistances, damage immunities, and condition immunities is removed. Instead, you may learn one of these options. Once a creature is affected by it, it cannot be affected again.",
        ],
      },
      {
        id: 'partnered-grim-hollow-lairs',
        heading: 'Grim Hollow: Lairs of Etharis ⚠️',
        bullets: ['**Feats** from this book are under review.'],
      },
      {
        id: 'partnered-dungeons-drakkenheim',
        heading: 'Dungeons of Drakkenheim ⚠️',
        bullets: [
          "Allowed items: Flamelance; Comet Smasher (rarity reduced to rare, arcane anomaly effect removed); Hazewalker Plate; Skymetal Shield; Skymetal Staff; Spellpiercing Wand; Starcrossed Bow; Chancellor's Crest; Inscrutable Staff (arcane anomaly effect removed); Lord Commander's Badge; Spymaster's Signet; Steward's Seal.",
        ],
      },
      {
        id: 'partnered-flee-mortals',
        heading: 'Flee, Mortals! ✅',
      },
      {
        id: 'partnered-where-evil-lives',
        heading: 'Where Evil Lives ✅',
      },
      {
        id: 'partnered-tales-from-shadows',
        heading: 'Tales From The Shadows ✅',
      },
      {
        id: 'partnered-grim-hollow-player-pack',
        heading: 'Grim Hollow: Player Pack ⚠️',
        bullets: [
          'Fighter **Blade Breaker** is available as a Prestige class found in the prestige shop.',
          '**This book is for 2014 users only.**',
        ],
      },
      {
        id: 'partnered-book-of-ebon-tides',
        heading: 'Book of Ebon Tides ❌',
      },
      {
        id: 'partnered-illrigger',
        heading: 'Illrigger ⚠️',
        bullets: [
          'The **Illrigger Class** is available as a prestige class. By association, the True Name magic item is removed.',
          'Spells from this source are allowed to be used.',
        ],
      },
      {
        id: 'partnered-lotr',
        heading: 'The Lord of the Rings Roleplaying ❌',
      },
      {
        id: 'partnered-humblewood-tales',
        heading: 'Humblewood Tales ⚠️',
        bullets: ["**Kwark's Wondrous Kernels (Tossable & Planter)** are removed."],
      },
      {
        id: 'partnered-drakkenheim-smugglers-secrets',
        heading: "Dungeons of Drakkenheim: In Search of the Smuggler's Secrets ❌",
      },
      {
        id: 'partnered-helianas-guide',
        heading: "Heliana's Guide to Monster Hunting ⚠️",
        bullets: [
          'Subclasses and weapons listed in additional weapons are allowed. Spells under further review.',
          'Crafting and harvest system not approved ❌.',
          'Items that have a Legendary or Very Rare variant use the highest rarity, rather than multiple versions.',
          'Weapon-specific feats such as Blade Barrier or Flourish are permitted for 2024 players.',
        ],
      },
      {
        id: 'partnered-valdas-spire-player-pack',
        heading: "Valda's Spire of Secrets: Player Pack ✅",
        bullets: ['Approved.'],
      },
      {
        id: 'partnered-call-of-netherdeep',
        heading: 'Critical Role: Call of the Netherdeep ⚠️',
        bullets: ['Medals are considered consumables.'],
      },
      {
        id: 'partnered-griffons-saddle-bag-2',
        heading: "The Griffon's Saddle Bag 2 ⚠️",
        bullets: [
          "**Candy Xorn's** gemstone property must be rolled upon use. Roll 1d100; on a 5 or lower it triggers, then roll to determine the gem's type.",
          '**Pisces Shield** requires attunement.',
          "**Night Owl's Half-Moon Spectacles** are removed.",
        ],
      },
      {
        id: 'partnered-obojima',
        heading: 'Obojima: Tales of the Tall Grass ⚠️',
      },
      {
        id: 'partnered-heroic-boons',
        heading: 'Heroic Boons',
        bullets: ['Heroic Boons are not allowed at character creation or on character sheets. They are awarded via prestige options.'],
      },
      {
        id: 'partnered-crooked-moon-part-1',
        heading: 'The Crooked Moon Part #1',
        bullets: [
          'If you plan to use the **Sinner** rogue subclass, be sure to correctly automate its features—they rely heavily on separating dice.',
          '2014-version backgrounds do not provide ASIs, as 2014 races already include them.',
        ],
      },
      {
        id: 'partnered-dark-gifts',
        heading: 'Dark Gifts ⚠️',
        bullets: ['Dark Gifts are not allowed at character creation or on character sheets. They are instead added via prestige options.'],
      },
    ],
    notes: [
      'Reminder that everything not listed here is not automatically approved for use. If you have a question, ask in #questions. **We are currently still reviewing the items in many sources.**',
    ],
  },
  {
    id: 'general-errata',
    title: 'GENERAL ERRATA',
    description: [
      {
        text: 'ALL CORE DND 2014 CONTENT BOOKS APPROVED',
      },
      {
        text: '__ALL OFFICIAL CONTENT IS ALLOWED.__ All published material for 2014 and 2024 versions of D&D under "Sourcebooks" in ',
        link: {
          href: 'https://www.dndbeyond.com/sources#Sourcebooks',
          label: 'D&D Beyond',
        },
        suffix:
          ' is allowed to be used. This includes standalone sources like One Grung Above, The Tortle Package, Acquisition Incorporated, etc. Variant and optional rules require DM approval at the table level.',
      },
      {
        text: 'Items balance is monitored closely. We will maintain a compendium of modifications and removals as needed—check the latest updates below for specifics.',
      },
    ],
    sections: [
      {
        id: 'general-unknown-rarity',
        heading: '__UNKNOWN RARITY ITEMS__ ❌',
        bullets: ['If an item\'s rarity is listed as "Unknown" on 5e.tools, it is disallowed until we assign a verdict and document it here.'],
      },
      {
        id: 'general-core-sources',
        heading: '__CORE SOURCES__ ✅',
        bullets: [
          '<a href="https://5e.tools/book.html#phb" target="_blank" rel="noopener noreferrer">Player\'s Handbook</a>',
          '<a href="https://5e.tools/book.html#mm" target="_blank" rel="noopener noreferrer">Monster Manual</a>',
          '<a href="https://5e.tools/book.html#dmg" target="_blank" rel="noopener noreferrer">Dungeon Master\'s Guide</a>',
        ],
      },
      {
        id: 'general-dmg-2024',
        heading: 'DMG 2024 / 2014 ⚠️',
        bullets: [
          '**Iron Flask** is removed.',
          'All **Deck of X** items are removed.',
          '**Conjuration Wizard** – Minor Conjuration can create items worth no more than 50× wizard level in gp. This uses class levels, not total character level.',
        ],
      },
      {
        id: 'general-xanathars',
        heading: "Xanathar's Guide to Everything ⚠️",
        bullets: [
          '**Orb of Direction** and **Orb of Time** function within the Passageways.',
          '**Moon Touched Swords** are now **Moon Touched Weapons** and can be applied to any melee weapon.',
        ],
      },
      {
        id: 'general-tashas',
        heading: "Tasha's Cauldron of Everything ⚠️",
        bullets: [
          '**Spellwrought Tattoos** – maximum number equals proficiency bonus.',
          '**Bloodfury Tattoo** necrotic healing only counts the tattoo\'s own 4d6 damage.',
          '**Guardian Emblem** only affects Paladin and Cleric spellcasting abilities.',
        ],
      },
      {
        id: 'general-waterdeep-mad-mage',
        heading: 'Waterdeep: Dungeon of the Mad Mage ⚠️',
        bullets: [
          '**Propeller Helm** no longer has a chance to lose its magic.',
          '**Horn of the Endless Maze** is removed.',
        ],
      },
      {
        id: 'general-lost-mine',
        heading: 'Lost Mine of Phandelver ❌',
        bullets: ['Items from this source are moved to PABTSO.'],
      },
      {
        id: 'general-phandelver-below',
        heading: 'Phandelver and Below: The Shattered Obelisk ⚠️',
        bullets: ['All **Mind Crystals** are removed.'],
      },
      {
        id: 'general-guildmasters',
        heading: "Guildmaster's Guide to Ravnica ✅",
      },
      {
        id: 'general-curse-of-strahd',
        heading: 'Curse of Strahd ✅',
      },
      {
        id: 'general-fizbans',
        heading: "Fizban's Treasury of Dragons ⚠️",
        bullets: ['Crystal Blades become **Crystal Weapons** and may be applied to any melee weapon.'],
      },
      {
        id: 'general-mythic-odyssey',
        heading: 'Mythic Odyssey of Theros ✅',
      },
      {
        id: 'general-out-of-the-abyss',
        heading: 'Out of the Abyss ✅',
      },
      {
        id: 'general-astral-adventurers',
        heading: "Astral Adventurer's Guide ✅",
      },
      {
        id: 'general-book-of-many-things',
        heading: 'Book of Many Things ✅',
        bullets: ['All **Deck of X** items are removed.'],
      },
      {
        id: 'general-princes-of-the-apocalypse',
        heading: 'Princes of the Apocalypse ✅',
      },
      {
        id: 'general-tales-of-the-yawning-portal',
        heading: 'Tales of the Yawning Portal ✅',
      },
      {
        id: 'general-tome-of-beasts',
        heading: 'Tome of Beasts 1 (2023) ⚠️',
        bullets: ['**Dissimortuum\'s Cursed Mask** is removed.'],
      },
      {
        id: 'general-volos',
        heading: "Volo's Guide to Monsters ⚠️",
        bullets: ['**Mind Carapace Armor** is removed.', '**Mind Lash** is removed.'],
      },
      {
        id: 'general-van-richtens',
        heading: "Van Richten's Guide to Ravenloft ⚠️",
        bullets: ['**Harkon\'s Bite** is removed.'],
      },
      {
        id: 'general-waterdeep-dragon-heist',
        heading: 'Waterdeep: Dragon Heist ⚠️',
        bullets: ['**Charred Wand of Magic Missiles** is removed.'],
      },
      {
        id: 'general-ghosts-of-saltmarsh',
        heading: 'Ghosts of Saltmarsh ✅',
      },
      {
        id: 'general-icewind-dale',
        heading: 'Icewind Dale: Rime of the Frostmaiden ⚠️',
        bullets: ['**Shield Guardian Amulet** is removed.'],
      },
      {
        id: 'general-acquisitions-inc',
        heading: 'Acquisitions Incorporated ⚠️',
        bullets: [
          'The **Chronolemeter** retains the **Unpredictable Effects** component of the Orrery of the Wanderer.',
        ],
      },
      {
        id: 'general-eberron-rising',
        heading: 'Eberron: Rising from the Last War ⚠️',
        bullets: ['**Wheel of Wind and Water** is removed.'],
      },
      {
        id: 'general-candlekeep',
        heading: 'Candlekeep Mysteries ⚠️',
        bullets: ['**Gloves of Soul Catching** – force healing only applies to the gloves\' inherent 2d10 force damage.'],
      },
    ],
  },
  {
    id: 'spell-errata',
    title: 'Spell Errata',
    description: [
      {
        text: 'Spell adjustments aligning 2014 and 2024 versions are documented here. Cross-check before preparing or learning material with multiple printings.',
      },
    ],
    sections: [
      {
        id: 'spell-errata-simulacrum',
        heading: 'Simulacrum, Demiplane & Glyph of Warding Rules',
        bullets: [
          'Respec or prestige changes update any active Simulacrum to match the new statistics.',
          'A character must be able to cast Simulacrum or Demiplane themselves to bring the effect into a session.',
          'Simulacrums of other PCs require the other player’s consent and can only appear when that PC is also present and agrees.',
          '**Item Attunement Requirement:** If the spell is cast through a magic item, the caster must be attuned to that item during the session.',
          '**Spell Gem Restriction:** To imbue a Spell Gem, the character must know the spell. No third party can imbue it on their behalf.',
          '**Ruby Weave Gem:** The spell learned through the gem, along with ongoing effects, is lost once attunement is broken.',
          'Casting and maintaining these spells consumes time—track DTP usage for out-of-session activity.',
          'Extradimensional spaces created by items (Bag of Holding, Portable Hole, etc.) cannot be used to store Glyph of Warding.',
        ],
      },
      {
        id: 'spell-errata-synchronization',
        heading: 'Synchronization (Wish)',
        bullets: [
          'When Wish replicates a concentration spell, you synchronize with that spell: damage cannot break synchronization and you may concentrate on another spell simultaneously.',
          '**Casting another synchronization-requiring Wish** ends any existing synchronization.',
          '**Being incapacitated or killed** ends synchronization.',
          'Any effect that specifically breaks concentration—such as **Supernal Smite** or an Elder Brain Dragon’s **Shatter Concentration**—also breaks synchronization.',
        ],
      },
    ],
  },
  {
    id: 'additional-weapons',
    title: 'Additional Weapons',
    description: [
      {
        text: 'Partnered content occasionally introduces new mundane or base weapons. After review, approved options are collected here.',
      },
    ],
    sections: [
      {
        id: 'additional-weapons-notes',
        heading: 'Notes & Rules',
        bullets: [
          'Magical bonuses to hit or damage (such as a +1 variant) do not enhance AC bonuses granted by a weapon’s passive effects or features.',
          'Magic weapon templates (Flame Tongue, Sword of Wounding, etc.) can be applied to these weapons when they share the same weapon group.',
        ],
      },
      {
        id: 'additional-weapons-standardized-cost',
        heading: 'Standardized Cost',
        bullets: [
          'Simple melee weapons: 10 gp',
          'Martial melee weapons: 25 gp',
          'Simple ranged weapons: 15 gp',
          'Martial ranged weapons: 50 gp',
        ],
      },
      {
        id: 'additional-weapons-boomerang',
        heading: 'Boomerang',
        bullets: [
          '*Simple Melee Weapon — 1d4 Slashing*',
          '*Finesse, Thrown (60/180), special*',
          '**Mastery:** Vex',
          '**Special:** When you attack with this weapon and miss, the boomerang returns to the thrower’s hand.',
        ],
      },
      {
        id: 'additional-weapons-frying-pan',
        heading: 'Frying Pan',
        bullets: [
          '*Simple Melee Weapon — 1d6 Bludgeoning*',
          '*Versatile (1d8), special*',
          '**Mastery:** Topple',
          '**Special:** As a bonus action you gain +1 AC until the end of your next turn (cannot be used with a shield).',
        ],
      },
      {
        id: 'additional-weapons-iron-tea-kettle',
        heading: 'Iron Tea Kettle',
        bullets: [
          '*Simple Melee Weapon — 2d4 Bludgeoning*',
          '*Two-Handed, Heavy*',
          '**Mastery:** Push',
        ],
      },
      {
        id: 'additional-weapons-shovel',
        heading: 'Shovel',
        bullets: [
          '*Simple Melee Weapon — 1d6 Bludgeoning*',
          '*Versatile (1d8), special*',
          '**Mastery:** Sap',
          '**Special:** Choose to deal Bludgeoning or Slashing damage on each attack.',
        ],
      },
      {
        id: 'additional-weapons-umbrella',
        heading: 'Umbrella',
        bullets: [
          '*Simple Melee Weapon — 1d4 Bludgeoning*',
          '*Finesse, special*',
          '**Mastery:** Slow',
          '**Special:** When you take falling damage while wielding the umbrella, use your reaction to reduce the damage by twice your proficiency bonus.',
        ],
      },
      {
        id: 'additional-weapons-nakudama-bubble-rod',
        heading: 'Nakudama Bubble Rod',
        bullets: [
          '*Martial Ranged Weapon — 2d4 Bludgeoning*',
          '*Ammunition (50/200 ft.; sling bullet), Heavy, Loading, Two-Handed*',
          '**Mastery:** Graze',
        ],
      },
      {
        id: 'additional-weapons-hooked-shortspear',
        heading: 'Hooked Shortspear',
        bullets: [
          '*Martial Melee Weapon — 1d4 Piercing*',
          '*Light, special*',
          '**Mastery:** Nick',
          '**Special:** On a hit, you can forgo damage to force a Strength save (DC 8 + Str modifier + proficiency) or knock the target prone.',
        ],
      },
      {
        id: 'additional-weapons-claws',
        heading: 'Claws',
        bullets: [
          '*Simple Melee Weapon — 1d6 Slashing*',
          '*Light, Attached*',
          '**Mastery:** Nick',
        ],
      },
      {
        id: 'additional-weapons-nunchaku',
        heading: 'Nunchaku',
        bullets: [
          '*Martial Melee Weapon — 1d6 Bludgeoning*',
          '*Finesse, Versatile (1d8), special*',
          '**Mastery:** None',
          '**Special:** When wielded two-handed, you may attempt a DC 13 Dexterity (Acrobatics) check before your first attack. Success grants +2 to that attack; failure deals bludgeoning damage to you equal to your proficiency bonus and grants no bonus.',
        ],
      },
      {
        id: 'additional-weapons-tetherhook',
        heading: 'Tetherhook',
        bullets: [
          '*Martial Melee Weapon — 1d8 Piercing*',
          '*Two-Handed, Reach, special*',
          '**Mastery:** None',
          '**Special:** After a hit, you may use a bonus action to contest the target with Strength (Athletics). On success, they cannot move farther away until they escape. They may spend an action to break free with a contested Strength (Athletics) or Dexterity (Acrobatics) check.',
        ],
      },
      {
        id: 'additional-weapons-twinblade',
        heading: 'Twinblade',
        bullets: [
          '*Martial Melee Weapon — 2d4 Slashing*',
          '*Two-Handed, Finesse, special*',
          '**Mastery:** None',
          '**Special:** When wielded two-handed, you may bonus action whirl the weapon (DC 13 Dexterity (Acrobatics)). Success grants +1 AC until your next turn (or +2 on a result of 18+). Failure deals slashing damage to you equal to your proficiency bonus.',
        ],
      },
    ],
  },
  {
    id: 'content-2024',
    title: '2024 Content',
    description: [
      {
        text: 'Here you will find any modified content for all 2024 core and partnered content books.',
      },
    ],
    sections: [
      {
        id: 'content-2024-character-creation',
        heading: 'Character Creation Process ⚠️',
        bullets: [
          'When creating your 2024 character, you must abide by the 2024 ruleset only. Do not mix-and-match class versions.',
          'Spell variants, feats, subclasses, and classes must come from 2024 sources.',
          'Use 2024 content exclusively unless referenced in the modified errata.',
          'Epic Boon slots are allocated per server rules—no more than the allotted boons unless prestige grants additional slots.',
          '2014 items may be used if a 2024 equivalent does not exist. **If a 2024 variant exists, you must use it. This rule is enforced.**',
        ],
      },
      {
        id: 'content-2024-cthulhu-by-torchlight',
        heading: 'Cthulhu by Torchlight ⚠️',
        bullets: [
          'Items and epic boon feats are pending approval.',
          'Subclasses and Origin feats are approved. ✅',
          'Spells are under review and possible modification.',
          '**Paladin: Oath of the Guardian** is banned. ❌',
        ],
      },
      {
        id: 'content-2024-grim-hollow-player-guide',
        heading: 'Grim Hollow Player Guide ⚠️',
        bullets: [
          'Monster Hunter class is approved. ✅',
          'Spells are under review and potential modification.',
          'Races and racial traits are not yet approved. ❌',
          'Feats are approved **except Iron Guts (banned).**',
          'Subclasses are approved but subject to beta adjustments.',
          'Items are approved and in the shop except: Hunters Armor, Breath of Beleth, Seeing Glass. ❌',
          '**This book is for 2024 users only.**',
        ],
      },
      {
        id: 'content-2024-important-note',
        heading: 'Important Note',
        bullets: ['**Most 2024 content is subject to change during beta testing.**'],
      },
      {
        id: 'content-2024-character-rules',
        heading: 'Character Creation Rules 2024',
        bullets: [
          '<span aria-hidden="true">🎲</span> **Ability Score Increases & Backgrounds:** Background ASIs are allowed. Most 2024 content is legal except those listed in #1395534150601019463.',
          '<span aria-hidden="true">🌟</span> **2014 / 2024 Ruling:** 2024 characters must strictly use 2024 spells, subclasses, races, feats, boons, and backgrounds.',
          '<span aria-hidden="true">🛡️</span> **Item Ruling 2024:** 2014 items are allowed when no 2024 equivalent exists. If a 2024 variant exists, it must be used.',
        ],
      },
      {
        id: 'content-2024-server-rules',
        heading: 'Server Rules – 2014 & 2024',
        bullets: [
          '2014 and 2024 players may trade items. The item shifts to match the recipient’s core rules version.',
          'If an item lacks a 2024 variant, it remains the 2014 version as per the rule above.',
          '**Respecs:** You cannot respec between different ruleset versions.',
        ],
      },
    ],
  },
  {
    title: '2014 Content',
    notes: [
      'Legacy material remains widely supported. When porting characters between rulesets, follow the official conversion guidance documented in the shared drive.',
    ],
  },
]
