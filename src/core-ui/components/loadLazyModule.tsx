import React from "react";
import { createLoadLazyModule } from "@levi-m/core";

import { Loading } from "./loading";

// export const loadLazyModule = createLoadLazyModule(<Loading.Component /> as React.ReactNode);
export const loadLazyModule = createLoadLazyModule(<Loading.Component />);