import React from 'react';
import { Card, CardTitle, CardBody, Title } from '@patternfly/react-core';
import { ChartDonut } from '@patternfly/react-charts';
import { useTheme } from '../context/ThemeContext';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  donutValue?: number;
  donutSuffix?: string;
  donutTotal?: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  donutValue,
  donutSuffix = '',
  donutTotal
}) => {
  const { mode } = useTheme();

  const isValidDonut =
    typeof donutValue === 'number' &&
    typeof donutTotal === 'number' &&
    donutTotal > 0 &&
    !isNaN(donutValue) &&
    !isNaN(donutTotal);

  const cardStyle: React.CSSProperties =
    mode === 'dark'
      ? {
          backgroundColor: '#1f1f1f',
          color: 'white',
          border: '1px solid #3c3f42'
        }
      : {
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid #d2d2d2'
        };

  return (
    <Card isCompact isFlat style={{ textAlign: 'center', ...cardStyle }}>
      <CardTitle>{title}</CardTitle>
      <CardBody>
        {isValidDonut ? (
          <ChartDonut
            ariaDesc={`${title} donut chart`}
            ariaTitle={title}
            constrainToVisibleArea
            data={[{ x: 'Used', y: donutValue }]}
            labels={({ datum }) => `${datum.y}${donutSuffix}`}
            subTitle={title}
            title={`${donutValue}${donutSuffix}`}
            height={150}
            width={150}
          />
        ) : (
          <>
            <Title headingLevel="h3" size="xl">{value}</Title>
            {subtitle && (
              <p style={{ marginTop: '0.5rem', color: '#6a6e73' }}>
                {subtitle}
              </p>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};
