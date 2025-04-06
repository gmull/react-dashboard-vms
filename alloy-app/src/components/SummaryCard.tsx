import React from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  Title
} from '@patternfly/react-core';
import {
  ChartDonut,
  ChartLabel
} from '@patternfly/react-charts';
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
          color: 'var(--pf-v5-global--Color--100)',
          border: '1px solid #3c3f42'
        }
      : {
          backgroundColor: '#ffffff',
          color: 'var(--pf-v5-global--Color--100)',
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
            data={[{ x: title, y: donutValue }]}
            labels={({ datum }) => `${datum.y}${donutSuffix}`}
            subTitle={title}
            title={`${donutValue}${donutSuffix}`}
            height={150}
            width={150}
            titleComponent={
              <ChartLabel
                style={{
                  fill: 'var(--pf-v5-global--Color--100)',
                  fontSize: 24,
                  fontWeight: 'bold'
                }}
              />
            }
            subTitleComponent={
              <ChartLabel
                style={{
                  fill: 'var(--pf-v5-global--Color--200)',
                  fontSize: 10,
                  fontWeight: 500
                }}
              />
            }
          />
        ) : (
          <>
            <Title headingLevel="h3" size="xl">{value}</Title>
            {subtitle && (
              <p style={{ marginTop: '0.5rem', color: 'var(--pf-v5-global--Color--200)' }}>
                {subtitle}
              </p>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};
