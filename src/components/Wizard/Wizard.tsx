import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../context/useConfig';
import { WizardNav } from './WizardNav';
import { WizardControls } from './WizardControls';
import { StepNetwork } from './StepNetwork';
import { StepIP } from './StepIP';
import { StepConnections } from './StepConnections';
import { StepProxyRoutes } from './StepProxyRoutes';
import { StepAdvanced } from './StepAdvanced';

import { downloadToml } from '../../utils/toml';
import { StepReview } from './StepReview';

const stepComponents = [
  StepNetwork,
  StepIP,
  StepConnections,
  StepProxyRoutes,
  StepAdvanced,
  StepReview,
];

export function Wizard() {
  const { t } = useTranslation();
  const { config } = useConfig();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    t('networkIdentity'),
    t('ipSettings'),
    t('connections'),
    t('proxyAndRoutes'),
    t('advancedOptions'),
    t('finish'),
  ];

  const goNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goDownload = () => {
    downloadToml(config);
  };

  const StepComponent = stepComponents[currentStep];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <WizardNav steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
      <div className="mt-8 p-8 rounded-2xl bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] flex flex-col gap-6">
        <StepComponent />
        <WizardControls
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrev={goPrev}
          onNext={goNext}
          onDownload={goDownload}
        />
      </div>
    </div>
  );
}
