export class FakeStyle {
  visibility = "";

  readonly properties = new Map<string, string>();

  setProperty(property: string, value: string) {
    this.properties.set(property, value);
  }

  getPropertyValue(property: string) {
    return this.properties.get(property) ?? "";
  }
}
