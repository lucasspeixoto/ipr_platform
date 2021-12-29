import React from 'react';
import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider
} from '@mui/material';

import { TextWrapper } from '@components/elements/Text';

import { IPersonal } from '@core/types/IPersonal';
import { IEcclesiastical } from '@core/types/IEcclesiastical.model';
import { ISupplementary } from '@core/types/ISupplementary.model';
import { formatDate } from '@core/helpers/FormatData';

interface ProfileItemCardProps {
  title: string;
  subtitle: string;
  data: IPersonal | ISupplementary | IEcclesiastical;
  keysNames: any;
}

export const ProfileItemCard: React.FC<ProfileItemCardProps> = ({
  title,
  subtitle,
  keysNames,
  data
}) => {
  return (
    <Grid item xs={12}>
      <Card>
        <Box
          p={3}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="subtitle2">{subtitle}</Typography>
          </Box>
        </Box>
        <Divider />
        {data && (
          <CardContent sx={{ p: 2 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                {Object.keys(data).map((key, index) => (
                  <React.Fragment key={index}>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        {keysNames[key]}:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      <TextWrapper color="black">
                        <b>
                          {data[key] ? formatDate(key, data[key]) : data[key]}
                        </b>
                      </TextWrapper>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Typography>
          </CardContent>
        )}
      </Card>
    </Grid>
  );
};
