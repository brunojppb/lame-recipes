import React from 'react';
import {Grid, View} from '@adobe/react-spectrum';

export default function BasicLayout({children}) {
  return (
    <Grid
      areas={['header', 'content', 'footer']}
      columns={['1fr']}
      rows={['auto']}
      height="1fr"
      gap="size-100">
      <View backgroundColor="celery-600" gridArea="header"/>
      <View backgroundColor="purple-600" gridArea="content">
        {children}
      </View>
      <View backgroundColor="magenta-600" gridArea="footer"/>
    </Grid>
  )
}