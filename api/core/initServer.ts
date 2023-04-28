import {configClient} from "../config/configClient/configClient";
import {app} from "../index";


export const initServer = (): void => {
  const {name, port} = configClient.resolveAppConfig();

  app.listen(port, () => {
    console.log(`App "${name}" is listening to port`);
  });
};
