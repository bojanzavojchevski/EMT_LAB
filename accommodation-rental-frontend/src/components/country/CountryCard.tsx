import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Country } from "../../types/country";

interface CountryCardProps {
    country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">
                    {country.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Continent: {country.continent ?? "N/A"}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    size="small"
                    component={RouterLink}
                    to={`/countries/${country.id}`}
                >
                    Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default CountryCard;