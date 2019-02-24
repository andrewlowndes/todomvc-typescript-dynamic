import { Dynamic } from "../models/core/Dynamic";

export interface ListItem {
  text: Dynamic<string>;
  ticked: Dynamic<boolean>;
}
