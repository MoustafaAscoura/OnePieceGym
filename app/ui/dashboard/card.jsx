import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function BasicCard(props) {
    const {title, description, number} = props
    return (
        <Card sx={{ minWidth: 275, px: 3}} className='rounded-md'>
        <CardContent>
            <Typography variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="h3">
                {number}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {description}
            </Typography>
        </CardContent>
        <CardActions>
            <Link href={`/dashboard/${title.toLowerCase()}`} size="small">See all</Link>
        </CardActions>
        </Card>
    );
}