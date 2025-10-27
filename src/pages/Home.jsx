
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import communityLinks from '../data/communityLinks.js'

const loreSections = [
  {
    title: 'The Beginning',
    paragraphs: [
      'In the beginning. 2 Primordial beings that existed before the very conceptualization of everything existed. Amidst nothing, Gaius, the being of order and creation found that with nothing, everything was in place, beautiful, peaceful. The 2nd being Asher, the being of dreams and potential saw what the universe could be.',
      "Eventually the universe was created by events unforeseen to the two of them. Whilst Asher was overjoyed. Gaius had despised how unruly and noisy the universe had become, often loathing creations that weren't made by their hand, or things that were not deemed 'worthy' via its standards. Eventually this would lead to Gaius creating what many people know as 'The Backrooms'. A perfectly orchestrated tapestry of reality deemed worthy by Gaius.",
      "Asher did not enjoy the unnatural existence of the backrooms but nevertheless enjoyed seeing their other half somewhat Happy... all was seemingly well until the dawn of humanity. Asher had fallen in love with Humanity, the mistakes and triumphs, the good and the bad. It viewed humanity as truly free. Gaius loathed humanity, unorderly, abominable insects that lived meaningless existences.",
      "Asher would eventually yearn to feel and live how humanity had, and would begin to choose vessels that would be able to handle its overwhelming state. It learned to truly love, feel, and live. Gaius grew weary and hateful of such a notion, yet Gaius would do the same.. perhaps their other half saw something they didn't... but no. Gaius found humanity abominable, a creation against god, the god being them, and so Gaius would begin to Slaughter all things in the universe.",
    ],
  },
  {
    title: 'The Shore',
    paragraphs: [
      "The story starts with a child born of a powerful adventuring couple, Jin Belmont and Alice Jeanna. The child was named Ares Belmont. A chosen vessel given their incredible affinity to perseverance and good. Much like any start, Ares's childhood was rather filled with wonder and splendour, his parents providing the best possible life they could for the young Ares. However, Jin always knew something remained dormant within Ares, something old, something primordial, beyond primordial, a concept, the vessel chosen by Asher, the final wielder being Ares.",
      "Upon discovery of a final vessel, Gaius set out across the multiverse wiping out and hunting every instance of Ares in every possible dimension and every dimension that was yet to exist... besides this one. Ares instead had a seal placed on their soul, laying dormant to hide from Gaius's vile gaze. It was only when Ares went up against Ancient Spirits when he truly awakened his dormant power.",
      "After Ares's awakening at a young age things only ramped up from there. With Ares having delved into the backrooms to stop the corruptions and eventual spread of liminality onto the real universe. Ares would continue this for quite some time, meanwhile having met many friends, making memories both good and bad, slaying and vanquishing many foes, and even finding a great love.",
      "One day, after the great raid of the ASYNC foundation, a facility designated for discovery and monitoring of the backrooms, Ares had dived deep into the backrooms finding the locations of 2 potential horcruxes of Gaius to destroy. Notifying the foundation and those who'd follow. The race against the clock had begun, Gaius no longer playing coy and setting out to destroy it all, to end the battle between its 'brother' once and for all.",
    ],
  },
  {
    title: 'Present Day',
    paragraphs: [
      "In present day. The passageways serve as a liminal nexus hub with gateways to many realms and worlds far and beyond. Protected in it's own pocket universe from the prying eyes of fake gods. The passageways are the road to lead to other roads. The path that will fork off to many different worlds.",
      "Many passengers ride the liminal trains through the hub given the sheer size of the region. Whilst within the Passageways, passengers are protected and granted immunity.",
    ],
  },
]

function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 8, display: 'grid', gap: 5 }}>
      <Box sx={{ textAlign: 'center', display: 'grid', gap: 2 }}>
        <Typography variant="overline" sx={{ letterSpacing: 3 }}>
          The Passageways
        </Typography>
        <Typography variant="h3" component="h1">
          Liminal Adventures Await
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore the nexus of realms, gather allies, and weave your own threads through the backrooms.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ pt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href={communityLinks.discord}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Discord
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            href={communityLinks.patreon}
            target="_blank"
            rel="noopener noreferrer"
          >
            Support on Patreon
          </Button>
        </Stack>
      </Box>

      <Box sx={{ display: 'grid', gap: 4 }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center' }}>
          Lore
        </Typography>
        {loreSections.map((section) => (
          <Box key={section.title} sx={{ display: 'grid', gap: 2 }}>
            <Typography variant="h5" component="h3">
              {section.title}
            </Typography>
            {section.paragraphs.map((paragraph, index) => (
              <Typography key={index} variant="body1" color="text.secondary">
                {paragraph}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default Home
