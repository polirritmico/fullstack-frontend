import { MemoryRouter, Route, Routes, useLocation } from "react-router";

export const LocationSpy = ({ marker = "aqui" }) => {
  const location = useLocation();
  return <div data-testid={marker}>{location.pathname}</div>;
};

export const RouterTestWrapper = ({ Component, testRoutes, spyMarker }) => (
  <MemoryRouter
    initialEntries={testRoutes}
    initialIndex={testRoutes.length - 1}
  >
    <Routes>
      <Route path="/" element={<LocationSpy marker={spyMarker} />} />

      {testRoutes.map((page) => (
        <Route
          key={page}
          path={page}
          element={
            <>
              <Component />
              <LocationSpy marker={spyMarker} />
            </>
          }
        />
      ))}
    </Routes>
  </MemoryRouter>
);

export const GuardTestWrapper = ({
  GuardComponent,
  protectedRoutes,
  unprotectedRoutes,
  initialPath,
  spyMarker,
}) => (
  <MemoryRouter initialEntries={[initialPath]}>
    <Routes>
      <Route element={<GuardComponent />}>
        {protectedRoutes.map((path) => (
          <Route
            key={path}
            path={path}
            element={<LocationSpy marker={spyMarker} />}
          />
        ))}
      </Route>

      {unprotectedRoutes.map((path) => (
        <Route
          key={path}
          path={path}
          element={<LocationSpy marker={spyMarker} />}
        />
      ))}
    </Routes>
  </MemoryRouter>
);
