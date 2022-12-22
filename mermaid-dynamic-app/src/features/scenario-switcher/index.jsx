import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Mermaid from "../../components/mermaid";
import { createChart } from "./utils/chart";

function ScenarioSwitcher() {
  const journeys = [
    {
      label: "Get User",
      value: "GET_USER",
    },
    {
      label: "Update Article",
      value: "UPDATE_USER",
    },
  ];

  const [journey, setJourney] = useState(journeys[0]);
  const [userAuthenticated, setUserAuthenticated] = useState(true);
  const [invalidPayloadSent, setInvalidPayloadSent] = useState(false);

  const handleUpdateJourney = (e) => {
    const newJourney = journeys.find(
      (journey) => journey.value === e.target.value
    );
    setJourney(newJourney);
  };

  const chart = createChart(userAuthenticated);

  return (
    <Container
      maxWidth="lg"
      sx={{ minWidth: (theme) => theme.breakpoints.values.md }}
    >
      <Typography variant="h3" sx={{ m: 2 }}>
        Dynamic Documentation
      </Typography>
      <Divider />
      <Box component="form" noValidate autoComplete="off" sx={{ m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormLabel>Request Options</FormLabel>
          </Grid>

          <Grid item xs={6}>
            <FormControl>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="authenticated" />}
                  label="User Authenticated"
                  checked={userAuthenticated}
                  value={userAuthenticated}
                  onChange={() => setUserAuthenticated(!userAuthenticated)}
                />

                <FormControlLabel
                  control={<Checkbox name="invalidPayload" />}
                  label="Invalid Payload"
                  checked={invalidPayloadSent}
                  value={invalidPayloadSent}
                  onChange={() => setInvalidPayloadSent(!invalidPayloadSent)}
                />
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                User Journey
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={journey.value}
                label="User Journey"
                onChange={handleUpdateJourney}
              >
                {journeys.map((journey) => (
                  <MenuItem
                    id={journey.label}
                    key={journey.value}
                    value={journey.value}
                  >
                    {journey.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Paper sx={{ p: 2, m: 2 }}>
          <Mermaid chart={chart} />
        </Paper>
      </Box>
    </Container>
  );
}

export default ScenarioSwitcher;
