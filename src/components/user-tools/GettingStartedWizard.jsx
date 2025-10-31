import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import StepContent from '@mui/material/StepContent'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded'
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded'
import ForumRoundedIcon from '@mui/icons-material/ForumRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'

const outerCardSx = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '28px',
  border: '1px solid rgba(127, 90, 240, 0.28)',
  background: 'linear-gradient(150deg, rgba(27, 21, 53, 0.92), rgba(54, 28, 94, 0.84))',
  px: { xs: 3, md: 4 },
  py: { xs: 3.5, md: 4.5 },
  boxShadow: '0 28px 48px rgba(8, 6, 25, 0.45)',
  display: 'grid',
  gap: { xs: 3, md: 3.5 },
  '&::before': {
    content: "''",
    position: 'absolute',
    width: 420,
    height: 420,
    top: -260,
    right: -220,
    background: 'radial-gradient(circle at center, rgba(137, 104, 255, 0.32), transparent 70%)',
  },
  '&::after': {
    content: "''",
    position: 'absolute',
    width: 380,
    height: 380,
    bottom: -240,
    left: -200,
    background: 'radial-gradient(circle at center, rgba(76, 220, 255, 0.26), transparent 70%)',
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}

const stepCardSx = {
  borderRadius: '22px',
  border: '1px solid rgba(127, 90, 240, 0.24)',
  background: 'linear-gradient(140deg, rgba(36, 27, 72, 0.88), rgba(57, 33, 96, 0.82))',
  padding: { xs: 2.5, md: 3 },
  display: 'grid',
  gap: 1.75,
  boxShadow: '0 18px 32px rgba(8, 6, 25, 0.35)',
}

const optionCardSx = {
  borderRadius: '18px',
  border: '1px solid rgba(127, 90, 240, 0.2)',
  background: 'linear-gradient(140deg, rgba(28, 22, 58, 0.82), rgba(47, 27, 78, 0.86))',
  padding: { xs: 2, md: 2.5 },
  display: 'grid',
  gap: 1.25,
  height: '100%',
}

const stepperSx = {
  '.MuiStep-root': {
    '& .MuiStepLabel-root': {
      alignItems: 'center',
    },
    '& .MuiStepIcon-root': {
      color: 'rgba(127, 90, 240, 0.45)',
      transition: 'color 200ms ease, transform 200ms ease',
      '&.Mui-active': {
        color: 'rgba(186, 154, 255, 0.95)',
        transform: 'scale(1.06)',
      },
      '&.Mui-completed': {
        color: 'rgba(76, 220, 255, 0.85)',
      },
    },
  },
}

const stepButtonSx = {
  justifyContent: 'flex-start',
  textAlign: 'left',
  py: 1,
  px: 0,
  '&:hover': {
    backgroundColor: 'rgba(127, 90, 240, 0.08)',
  },
  '.MuiStepLabel-label': {
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'rgba(240, 238, 255, 0.88)',
    fontSize: 13,
  },
  '.MuiStepLabel-label.Mui-active': {
    color: '#f8f6ff',
  },
  '.MuiStepLabel-label.Mui-completed': {
    color: 'rgba(199, 210, 255, 0.9)',
  },
}

const stepTitleSx = {
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: '#f8f6ff',
  fontSize: 15,
}

const stepLinkBaseSx = {
  fontWeight: 600,
  textDecoration: 'underline',
  textUnderlineOffset: 4,
  transition: 'opacity 200ms ease',
}

function GettingStartedWizard({ hasAcceptedRules = false, onAcceptRules, onOpenCharacterForm }) {
  const [activeStep, setActiveStep] = useState(0)

  const handleAcceptRules = () => {
    if (onAcceptRules) {
      onAcceptRules()
    }
  }

  const handleOpenForm = () => {
    if (onOpenCharacterForm) {
      onOpenCharacterForm()
    }
  }

  const handleStepSelect = (index) => {
    setActiveStep(index)
  }

  const steps = [
    {
      label: 'Review the rules & lore',
      content: (
        <Box sx={stepCardSx}>
          <Typography sx={stepTitleSx}>Review the rules & lore</Typography>
          <Stack spacing={1.5}>
            <Typography sx={{ color: 'rgba(210, 215, 255, 0.82)', lineHeight: 1.6 }}>
              Before you dive in, take a moment to read through the server rules and a bit of the setting lore so you
              know how things work around here.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} alignItems="flex-start">
              <Button
                variant="contained"
                color={hasAcceptedRules ? 'success' : 'secondary'}
                onClick={handleAcceptRules}
                disabled={!onAcceptRules || hasAcceptedRules}
                sx={{
                  minWidth: 180,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {hasAcceptedRules ? 'Rules Accepted' : 'Accept Rules'}
              </Button>
              <Typography variant="caption" sx={{ color: 'rgba(210, 215, 255, 0.7)' }}>
                Button will connect once the rules flow is live. For now, make sure you have read the pinned
                documentation in the rules channels.
              </Typography>
            </Stack>
          </Stack>
        </Box>
      ),
    },
    {
      label: 'Claim your player drive folder',
      content: (
        <Box sx={stepCardSx}>
          <Typography sx={stepTitleSx}>Claim your player drive folder</Typography>
          <Typography sx={{ color: 'rgba(210, 215, 255, 0.82)', lineHeight: 1.6 }}>
            Fill out the player folder request form once. Your folder will appear in Google Drive using the email you
            provide, so make sure it matches your Google account.
          </Typography>
          <Button
            component="a"
            href="https://docs.google.com/forms/d/e/1FAIpQLSeeskIk461_gSh-Ogts-vgxWE3aZjw4acZf7xgCOlLgaMYs-g/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<InsertDriveFileRoundedIcon />}
            sx={{
              alignSelf: 'flex-start',
              fontWeight: 700,
              letterSpacing: '0.06em',
              borderRadius: '14px',
            }}
          >
            Open Player Folder Form
          </Button>
        </Box>
      ),
    },
    {
      label: 'Complete the Character Creation form',
      content: (
        <Box sx={stepCardSx}>
          <Typography sx={stepTitleSx}>Complete the Character Creation form</Typography>
          <Stack spacing={1.5}>
            <Typography sx={{ color: 'rgba(210, 215, 255, 0.82)', lineHeight: 1.6 }}>
              Use the Character Creation form in this tool to lay out your build details, sources, and other key
              information for staff review.{' '}
              <Link
                component="button"
                type="button"
                onClick={(event) => {
                  event.preventDefault()
                  if (hasAcceptedRules) {
                    handleOpenForm()
                  }
                }}
                aria-disabled={!hasAcceptedRules}
                sx={{
                  ...stepLinkBaseSx,
                  color: hasAcceptedRules
                    ? 'rgba(133, 209, 255, 0.92)'
                    : 'rgba(170, 174, 210, 0.55)',
                  cursor: hasAcceptedRules ? 'pointer' : 'not-allowed',
                  opacity: hasAcceptedRules ? 1 : 0.6,
                }}
              >
                Open the Create Character tab
              </Link>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenForm}
              disabled={!hasAcceptedRules}
              startIcon={<SchoolRoundedIcon />}
              sx={{
                alignSelf: 'flex-start',
                fontWeight: 700,
                letterSpacing: '0.06em',
                borderRadius: '14px',
                textTransform: 'uppercase',
              }}
            >
              {hasAcceptedRules ? 'Jump to Character Form' : 'Accept Rules to Continue'}
            </Button>
          </Stack>
        </Box>
      ),
    },
    {
      label: 'Choose your character sheet platform',
      content: (
        <Box sx={stepCardSx}>
          <Typography sx={stepTitleSx}>Choose your character sheet platform</Typography>
          <Typography sx={{ color: 'rgba(210, 215, 255, 0.82)', lineHeight: 1.6 }}>
            You have a few options. If you expect to level beyond 20, Dicecloud or the Google Sheet template are
            recommended.
          </Typography>
          <Grid container spacing={{ xs: 2, md: 2.5 }}>
            <Grid item xs={12} md={4}>
              <Box sx={optionCardSx}>
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <Chip label="Beginner Friendly" size="small" sx={{ fontWeight: 600 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f8f6ff' }}>
                    D&D Beyond
                  </Typography>
                </Stack>
                <Typography sx={{ color: 'rgba(210, 215, 255, 0.82)', lineHeight: 1.55 }}>
                  Quick and easy. If you use Beyond, add a direct link to your sheet when you post your creation log.
                </Typography>
                <Button
                  component="a"
                  href="https://www.dndbeyond.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                  sx={{ justifyContent: 'flex-start', px: 0, fontWeight: 700 }}
                >
                  Visit D&D Beyond
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={optionCardSx}>
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <Chip label="Great beyond 20" size="small" sx={{ fontWeight: 600 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f8f6ff' }}>
                    Dicecloud
                  </Typography>
                </Stack>
                <Typography sx={{ color: 'rgba(210, 215, 255, 0.82)', lineHeight: 1.55 }}>
                  Add your Dicecloud link to the red section of your tracking sheet inside your Google Drive folder.
                </Typography>
                <Button
                  component="a"
                  href="https://app.dicecloud.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                  sx={{ justifyContent: 'flex-start', px: 0, fontWeight: 700 }}
                >
                  Visit Dicecloud
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={optionCardSx}>
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <Chip label="Spreadsheet" size="small" sx={{ fontWeight: 600 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f8f6ff' }}>
                    Google Sheet Template
                  </Typography>
                </Stack>
                <Typography sx={{ color: 'rgba(210, 215, 255, 0.82)', lineHeight: 1.55 }}>
                  In your Drive folder you will find a blank sheet. Make a copy, rename it to your character, and keep
                  it updated.
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(210, 215, 255, 0.72)' }}>
                  Tip: you only need this if you are not using Beyond or Dicecloud.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ),
    },
    {
      label: 'Post in #creation_log',
      content: (
        <Box sx={stepCardSx}>
          <Typography sx={stepTitleSx}>Post in #creation_log</Typography>
          <Stack spacing={1.5}>
            <Typography sx={{ color: 'rgba(210, 215, 255, 0.82)', lineHeight: 1.6 }}>
              Share your new character in the <code>#creation_log</code> channel using the pinned template. Include your
              sheet link and highlight anything staff should know (race sources, feats, etc.).
            </Typography>
            <Typography sx={{ color: 'rgba(210, 215, 255, 0.75)' }}>
              You can find a Creation Log cheat sheet inside your Drive folder.{' '}
              <Link href="#" color="inherit" underline="always">
                Link coming soon
              </Link>
            </Typography>
            <Typography sx={{ color: 'rgba(210, 215, 255, 0.75)' }}>
              Need help? Open a ticket with the helpers or admins via <code>#create-a-ticket</code>, or ask in the
              general/questions thread.
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(210, 215, 255, 0.72)' }}>
              PSA: For races with multiple sourcebook versions, always list the specific source you selected.
            </Typography>
          </Stack>
        </Box>
      ),
    },
    {
      label: 'Get approved & grab your role',
      content: (
        <Box sx={stepCardSx}>
          <Typography sx={stepTitleSx}>Get approved & grab your role</Typography>
          <Stack spacing={1.5}>
            <Typography sx={{ color: 'rgba(210, 215, 255, 0.82)', lineHeight: 1.6 }}>
              Once staff gives you the ✅, you will receive the Player role and are ready to jump into games!
            </Typography>
            <Typography sx={{ color: 'rgba(210, 215, 255, 0.82)', lineHeight: 1.6 }}>
              Visit the <code>#roles</code> channel and grab @Tier 1 (3-4) to get notified about new sessions.
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(210, 215, 255, 0.72)' }}>
              Reminder: Players may take either max starting gold from their class or the listed starting equipment.
            </Typography>
          </Stack>
          <Divider sx={{ borderColor: 'rgba(127, 90, 240, 0.18)', mt: 2 }} />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems="flex-start" sx={{ mt: 2 }}>
            <RocketLaunchRoundedIcon sx={{ color: 'rgba(186, 154, 255, 0.95)' }} />
            <Typography sx={{ color: 'rgba(210, 215, 255, 0.78)', lineHeight: 1.55 }}>
              Before you dive into your first quest, double-check the allowed content list so you know which books and
              options are in play.{' '}
              <Link href="#" underline="always" color="inherit">
                Allowed content link coming soon
              </Link>
            </Typography>
          </Stack>
        </Box>
      ),
    },
  ]

  const totalSteps = steps.length

  const goToStep = (offset) => {
    setActiveStep((prev) => {
      const next = prev + offset
      if (next < 0) {
        return 0
      }
      if (next >= totalSteps) {
        return totalSteps - 1
      }
      return next
    })
  }

  return (
    <Box sx={outerCardSx}>
      <Stack spacing={1.5}>
        <Chip
          icon={<AutoAwesomeRoundedIcon sx={{ color: '#0b041f' }} />}
          label="Getting Started Wizard"
          sx={{
            alignSelf: 'flex-start',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, rgba(138, 84, 255, 0.75), rgba(76, 220, 255, 0.6))',
            color: '#0b041f',
            px: 1.5,
            py: 0.5,
          }}
        />
        <Typography sx={{ color: 'rgba(210, 215, 255, 0.8)' }}>
          Follow these steps to get your character approved and ready for adventures. You can always jump ahead once
          you have accepted the rules.
        </Typography>
      </Stack>

      <Stepper orientation="vertical" nonLinear activeStep={activeStep} connector={null} sx={stepperSx}>
        {steps.map((step, index) => (
          <Step key={step.label} expanded={activeStep === index}>
            <StepButton color="inherit" onClick={() => handleStepSelect(index)} sx={stepButtonSx}>
              {step.label}
            </StepButton>
            <StepContent TransitionProps={{ unmountOnExit: false }} sx={{ ml: 0, pl: { xs: 2, md: 2.5 } }}>
              {step.content}
              <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => goToStep(-1)}
                  disabled={index === 0}
                  sx={{ opacity: index === 0 ? 0.5 : 1 }}
                >
                  Previous
                </Button>
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => goToStep(1)}
                  disabled={index === totalSteps - 1}
                  sx={{ ml: 'auto', opacity: index === totalSteps - 1 ? 0.5 : 1 }}
                >
                  Next
                </Button>
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      <Divider sx={{ borderColor: 'rgba(127, 90, 240, 0.18)' }} />

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }}>
        <AssignmentTurnedInRoundedIcon sx={{ color: 'rgba(186, 154, 255, 0.95)', fontSize: 32 }} />
        <Typography sx={{ color: 'rgba(210, 215, 255, 0.82)', lineHeight: 1.6 }}>
          Keep checking back as more helper links come online. If you ever feel stuck, drop a question in the helper
          channels—your fellow players and staff are ready to assist.
        </Typography>
        <ForumRoundedIcon sx={{ color: 'rgba(76, 220, 255, 0.95)', fontSize: 32 }} />
      </Stack>
    </Box>
  )
}

export default GettingStartedWizard
