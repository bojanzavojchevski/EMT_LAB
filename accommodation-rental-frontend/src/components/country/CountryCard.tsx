import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Country } from "../../types/country";

interface CountryCardProps {
    country: Country;
    canManage: boolean;
    onEdit: (country: Country) => void;
    onDelete: (id: number) => void;
}

const CountryCard = ({
                         country,
                         canManage,
                         onEdit,
                         onDelete,
                     }: CountryCardProps) => {
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

                {canManage && (
                    <>
                        <Button
                            size="small"
                            onClick={() => onEdit(country)}
                        >
                            Edit
                        </Button>

                        <Button
                            size="small"
                            color="error"
                            onClick={() => onDelete(country.id)}
                        >
                            Delete
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
};

export default CountryCard;