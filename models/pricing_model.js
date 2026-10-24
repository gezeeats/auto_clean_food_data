
export class PricingModel {
  constructor({
    orderRangePrices = [300, 600, 1000, 1500],
    pricePerKilometer = [15.0, 20.0, 25.0, 30.0],
    timeMultipliers = [4.0, 1.0, 1.5, 3.0],
    timeRanges = ["0,7", "7,18", "18,21", "21,24"],
    initialDeliveryFee = [25.0, 40.0, 60.0, 85.0],
  } = {}) {
    this.orderRangePrices = orderRangePrices;
    this.pricePerKilometer = pricePerKilometer;
    this.timeMultipliers = timeMultipliers;
    this.timeRanges = timeRanges;
    this.initialDeliveryFee = initialDeliveryFee;
  }

  copyWith({
    orderRangePrices,
    pricePerKilometer,
    timeMultipliers,
    timeRanges,
    initialDeliveryFee,
  } = {}) {
    return new PricingModel({
      orderRangePrices: orderRangePrices ?? this.orderRangePrices,
      pricePerKilometer: pricePerKilometer ?? this.pricePerKilometer,
      timeMultipliers: timeMultipliers ?? this.timeMultipliers,
      timeRanges: timeRanges ?? this.timeRanges,
      initialDeliveryFee: initialDeliveryFee ?? this.initialDeliveryFee,
    });
  }

  toMap() {
    return {
      orderRangePrices: this.orderRangePrices,
      pricePerKilometer: this.pricePerKilometer,
      timeMultipliers: this.timeMultipliers,
      timeRanges: this.timeRanges,
      initialDeliveryFee: this.initialDeliveryFee,
    };
  }

  static fromMap(map = {}) {
    const toNumbers = (value, fallback) =>
      Array.isArray(value) ? value.map(Number) : fallback;

    return new PricingModel({
      orderRangePrices: toNumbers(
        map.orderRangePrices,
        [300, 600, 1000, 1500],
      ),
      pricePerKilometer: toNumbers(
        map.pricePerKilometer,
        [15.0, 20.0, 25.0, 30.0],
      ),
      timeMultipliers: toNumbers(
        map.timeMultipliers,
        [4.0, 1.0, 1.5, 3.0],
      ),
      timeRanges: Array.isArray(map.timeRanges)
        ? map.timeRanges.map(String)
        : ["0,7", "7,18", "18,21", "21,24"],
      initialDeliveryFee: toNumbers(
        map.initialDeliveryFee,
        [25.0, 40.0, 60.0, 85.0],
      ),
    });
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    return PricingModel.fromMap(JSON.parse(source));
  }
}
