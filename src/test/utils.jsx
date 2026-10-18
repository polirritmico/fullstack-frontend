import { MemoryRouter, Route, Routes, useLocation } from "react-router";

export const LocationSpy = () => {
  const location = useLocation();
  return <div data-testid="aqui">{location.pathname}</div>;
};

export const RouterTestWrapper = ({ Component, testRoutes }) => (
  <MemoryRouter
    initialEntries={testRoutes}
    initialIndex={testRoutes.length - 1}
  >
    <Routes>
      <Route path="/" element={<LocationSpy />} />

      {testRoutes.map((page) => (
        <Route
          key={page}
          path={page}
          element={
            <>
              <Component />
              <LocationSpy />
            </>
          }
        />
      ))}
    </Routes>
  </MemoryRouter>
);
