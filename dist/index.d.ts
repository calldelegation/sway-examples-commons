import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { TypographyProps } from '@mui/material';

type OnboardingFlowProps = {
    container?: Element | (() => Element | null) | null;
};
declare const OnboardingFlow: ({ container }: OnboardingFlowProps) => react_jsx_runtime.JSX.Element;

type OnboardingFlowContextType = {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
};
declare const OnboardingFlowContext: react.Context<OnboardingFlowContextType | null>;
declare const useOnboardingFlowContext: () => OnboardingFlowContextType;
declare const OnboardingFlowProvider: ({ children, }: {
    children: React.ReactNode;
}) => react_jsx_runtime.JSX.Element;

type TextProps = TypographyProps;
declare const Text: ({ children, className, ...props }: TextProps) => react_jsx_runtime.JSX.Element;

declare const useBreakpoints: () => {
    isMobile: boolean;
    isTablet: boolean;
};

export { OnboardingFlow, OnboardingFlowContext, type OnboardingFlowContextType, OnboardingFlowProvider, Text, useBreakpoints, useOnboardingFlowContext };
