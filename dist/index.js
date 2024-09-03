// src/components/OnboardingFlow.tsx
import { Box as Box3, Dialog, DialogContent, Stack as Stack3 } from "@mui/material";
import { useEffect as useEffect4, useState as useState4 } from "react";

// src/components/WelcomePage.tsx
import { Box as Box2, Button, Stack } from "@mui/material";
import {
  useConnectUI,
  useConnect,
  useIsConnected,
  useWallet,
  useBalance
} from "@fuels/react";
import { useEffect } from "react";

// src/components/Text.tsx
import { Typography } from "@mui/material";
import { jsx } from "react/jsx-runtime";
var Text = ({ children, className, ...props }) => {
  return /* @__PURE__ */ jsx(Typography, { ...props, className: `text-white font-sans ${className}`, children });
};

// src/components/OnboardingTopBar.tsx
import { Box } from "@mui/material";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var OnboardingTopBar = ({ currentStep }) => {
  return /* @__PURE__ */ jsxs(Box, { className: "flex w-full items-center justify-around", children: [
    /* @__PURE__ */ jsx2(
      Text,
      {
        className: currentStep === 0 /* Welcome */ ? "" : "!text-slate-600",
        children: "1. Welcome"
      }
    ),
    /* @__PURE__ */ jsx2(
      Text,
      {
        className: currentStep === 1 /* Faucet */ ? "" : "!text-slate-600",
        children: "2. Faucet"
      }
    ),
    /* @__PURE__ */ jsx2(
      Text,
      {
        className: currentStep === 2 /* Success */ ? "" : "!text-slate-600",
        children: "3. Success"
      }
    )
  ] });
};

// src/utils/isSafari.ts
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// src/components/WelcomePage.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var WelcomePage = ({
  message,
  messageProps,
  setCurrentStep
}) => {
  const { connect: connectUI } = useConnectUI();
  const { connect: connectBurner } = useConnect();
  const {
    wallet,
    isLoading: isLoadingWallet,
    isPending: isPendingWallet,
    isFetching: isFetchingWallet
  } = useWallet();
  const {
    balance,
    isFetching: isFetchingBalance,
    isPending: isPendingBalance,
    isLoading: isLoadingBalance
  } = useBalance({
    address: wallet?.address.toString()
  });
  const { isConnected } = useIsConnected();
  const isBalanceLoading = isFetchingBalance || isPendingBalance || isLoadingBalance;
  const isWalletLoading = isLoadingWallet || isPendingWallet || isFetchingWallet;
  useEffect(() => {
    if (isConnected && wallet) {
      if (balance && balance.gt(0)) {
        setCurrentStep(2 /* Success */);
      } else if (!isBalanceLoading) {
        if (isSafari) {
          const redirectUrl = new URL("https://faucet-testnet.fuel.network/");
          redirectUrl.searchParams.append("address", wallet.address.toString());
          redirectUrl.searchParams.append("redirectUrl", window.location.href);
          window.location.href = redirectUrl.href;
        } else {
          setCurrentStep(1 /* Faucet */);
        }
      }
    }
  }, [isConnected, wallet, balance, isBalanceLoading]);
  return /* @__PURE__ */ jsxs2(Stack, { spacing: 3, className: "w-5/6 items-center", children: [
    message && /* @__PURE__ */ jsx3(Text, { ...messageProps, children: message }),
    isWalletLoading ? /* @__PURE__ */ jsx3(Text, { children: "Loading..." }) : /* @__PURE__ */ jsxs2(Fragment, { children: [
      /* @__PURE__ */ jsx3(
        Button,
        {
          className: "btn-primary h-12 w-full",
          onClick: () => {
            connectBurner("Burner Wallet");
          },
          children: "Temporary Wallet"
        }
      ),
      /* @__PURE__ */ jsx3(Box2, { className: "border-b-2 border-slate-600 w-full" }),
      /* @__PURE__ */ jsx3(
        Button,
        {
          variant: "outlined",
          className: "text-white h-12 w-full border-slate-600",
          onClick: () => {
            connectUI();
          },
          children: "Connect"
        }
      )
    ] })
  ] });
};

// src/components/FaucetPage.tsx
import { useWallet as useWallet2, useBalance as useBalance2 } from "@fuels/react";
import { useEffect as useEffect2, useState as useState2 } from "react";

// src/config.ts
var TESTNET_FAUCET_LINK = "https://faucet-testnet.fuel.network/";

// src/components/FaucetPage.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var FaucetPage = ({ setCurrentStep }) => {
  const {
    wallet,
    isLoading: isLoadingWallet,
    isPending: isPendingWallet,
    isFetching: isFetchingWallet
  } = useWallet2();
  const {
    isPending: isPendingBalance,
    isLoading: isLoadingBalance,
    isFetching: isFetchingBalance
  } = useBalance2({ address: wallet?.address.toString() });
  const [className, setClassName] = useState2("");
  const isLoading = isLoadingWallet || isPendingWallet || isFetchingWallet || !wallet && (isPendingBalance || isLoadingBalance || isFetchingBalance);
  useEffect2(() => {
    const logo = document.getElementsByClassName("fuel-logo");
    if (logo) {
      setClassName("overflow-hidden h-[800px]");
    }
  }, []);
  if (isLoading) return /* @__PURE__ */ jsx4(Text, { children: "Loading..." });
  if (!wallet) return /* @__PURE__ */ jsx4(Text, { children: "Wallet not found" });
  return /* @__PURE__ */ jsx4(
    "iframe",
    {
      src: `${TESTNET_FAUCET_LINK}?address=${wallet.address.toAddress()}`,
      id: "test",
      width: "100%",
      height: "800px",
      className,
      children: "hello"
    }
  );
};

// src/components/SuccessPage.tsx
import { Button as Button2, Stack as Stack2 } from "@mui/material";

// src/components/OnboardingFlowProvider.tsx
import { createContext, useContext, useState as useState3 } from "react";
import { useIsConnected as useIsConnected2 } from "@fuels/react";
import { Toaster } from "react-hot-toast";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var OnboardingFlowContext = createContext(null);
var useOnboardingFlowContext = () => {
  const context = useContext(
    OnboardingFlowContext
  );
  if (!context) {
    throw new Error(
      "useOnboardingFlowContext must be used within OnboardingFlowProvider"
    );
  }
  return context;
};
var OnboardingFlowProvider = ({
  children
}) => {
  const { isConnected } = useIsConnected2();
  const [openDialog, setOpenDialog] = useState3(!isConnected);
  return (
    // <FuelProvider fuelConfig={{ connectors: defaultConnectors() }}>
    /* @__PURE__ */ jsxs3(OnboardingFlowContext.Provider, { value: { openDialog, setOpenDialog }, children: [
      /* @__PURE__ */ jsx5(Toaster, {}),
      children
    ] })
  );
};

// src/components/SuccessPage.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var SuccessPage = ({ message }) => {
  const { setOpenDialog } = useOnboardingFlowContext();
  return /* @__PURE__ */ jsxs4(Stack2, { spacing: 2, className: "items-center w-full", children: [
    message && /* @__PURE__ */ jsx6(Text, { children: message }),
    /* @__PURE__ */ jsx6(
      Button2,
      {
        className: "btn-primary h-12 w-3/4",
        onClick: () => setOpenDialog(false),
        children: "Continue to App"
      }
    )
  ] });
};

// src/hooks/useBreakpoints.ts
import { useMedia } from "react-use";
var useBreakpoints = () => {
  const isMobile = useMedia("(max-width: 640px)", false);
  const isTablet = useMedia("(max-width: 768px)", true);
  return { isMobile, isTablet };
};

// src/components/OnboardingFlow.tsx
import { useBalance as useBalance3, useWallet as useWallet3 } from "@fuels/react";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var OnboardingFlow = ({ container }) => {
  const { openDialog } = useOnboardingFlowContext();
  const [currentStep, setCurrentStep] = useState4(0 /* Welcome */);
  const { isMobile } = useBreakpoints();
  const { wallet } = useWallet3();
  const { balance, refetch: refetchBalance } = useBalance3({
    address: wallet?.address.toString()
  });
  useEffect4(() => {
    const interval = setInterval(refetchBalance, 500);
    if (balance && balance.gt(0)) {
      setCurrentStep(2 /* Success */);
    }
    return () => clearInterval(interval);
  }, [balance]);
  return /* @__PURE__ */ jsx7(
    Dialog,
    {
      fullScreen: isMobile,
      container,
      open: openDialog,
      id: "onboarding",
      PaperProps: { className: "p-8 w-full bg-black border-slate-600 border" },
      children: /* @__PURE__ */ jsx7(DialogContent, { children: /* @__PURE__ */ jsxs5(Stack3, { spacing: 4, className: "items-center", children: [
        /* @__PURE__ */ jsx7(OnboardingTopBar, { currentStep }),
        /* @__PURE__ */ jsx7(Box3, { className: "flex w-full justify-center items-center", children: currentStep === 0 /* Welcome */ ? /* @__PURE__ */ jsx7(
          WelcomePage,
          {
            message: "Welcome to Sway NFT!",
            messageProps: { className: "text-xl" },
            setCurrentStep
          }
        ) : currentStep === 1 /* Faucet */ ? /* @__PURE__ */ jsx7(FaucetPage, { setCurrentStep }) : /* @__PURE__ */ jsx7(SuccessPage, { message: "Success!" }) })
      ] }) })
    }
  );
};
export {
  OnboardingFlow,
  OnboardingFlowContext,
  OnboardingFlowProvider,
  Text,
  useBreakpoints,
  useOnboardingFlowContext
};
//# sourceMappingURL=index.js.map