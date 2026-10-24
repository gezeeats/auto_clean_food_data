
export class DeliveryWeightConfigModel {
  constructor({
    weightDistance = 0.35,
    weightOnline = 0.20,
    weightLastSeen = 0.15,
    weightRating = 0.10,
    weightDeliveries = 0.05,
    weightCancelled = 0.10,
    weightOnDelivery = 0.03,
    weightLocationStaleness = 0.07,
    platformShareFromDeliveryOutOf100 = 20,
    deliveryPersonShareFromDeliveryOutOf100 = 70,
    deliveryanagerShareFromDeliveryOutOf100 = 10,
    governmentShareFromDeliveryOutOf100 = 0,
    maxDistanceKm = 15,
    maxDeliveriesCap = 500,
    maxLastSeenMinutes = 120,
  } = {}) {
    this.weightDistance = weightDistance;
    this.weightOnline = weightOnline;
    this.weightLastSeen = weightLastSeen;
    this.weightRating = weightRating;
    this.weightDeliveries = weightDeliveries;
    this.weightCancelled = weightCancelled;
    this.weightOnDelivery = weightOnDelivery;
    this.weightLocationStaleness = weightLocationStaleness;
    this.platformShareFromDeliveryOutOf100 = platformShareFromDeliveryOutOf100;
    this.deliveryPersonShareFromDeliveryOutOf100 =
      deliveryPersonShareFromDeliveryOutOf100;
    this.deliveryanagerShareFromDeliveryOutOf100 =
      deliveryanagerShareFromDeliveryOutOf100;
    this.governmentShareFromDeliveryOutOf100 =
      governmentShareFromDeliveryOutOf100;
    this.maxDistanceKm = maxDistanceKm;
    this.maxDeliveriesCap = maxDeliveriesCap;
    this.maxLastSeenMinutes = maxLastSeenMinutes;
  }

  copyWith(values = {}) {
    const current = this.toMap();

    return new DeliveryWeightConfigModel({
      ...current,
      ...Object.fromEntries(
        Object.entries(values).filter(([, value]) => value != null),
      ),
    });
  }

  toMap() {
    return {
      weightDistance: this.weightDistance,
      weightOnline: this.weightOnline,
      weightLastSeen: this.weightLastSeen,
      weightRating: this.weightRating,
      weightDeliveries: this.weightDeliveries,
      weightCancelled: this.weightCancelled,
      weightOnDelivery: this.weightOnDelivery,
      weightLocationStaleness: this.weightLocationStaleness,
      platformShareFromDeliveryOutOf100:
        this.platformShareFromDeliveryOutOf100,
      deliveryPersonShareFromDeliveryOutOf100:
        this.deliveryPersonShareFromDeliveryOutOf100,
      deliveryanagerShareFromDeliveryOutOf100:
        this.deliveryanagerShareFromDeliveryOutOf100,
      governmentShareFromDeliveryOutOf100:
        this.governmentShareFromDeliveryOutOf100,
      maxDistanceKm: this.maxDistanceKm,
      maxDeliveriesCap: this.maxDeliveriesCap,
      maxLastSeenMinutes: this.maxLastSeenMinutes,
    };
  }

  static fromMap(map = {}) {
    const defaults = new DeliveryWeightConfigModel().toMap();
    const result = {};

    for (const [key, fallback] of Object.entries(defaults)) {
      const value = map[key];

      result[key] =
        value == null
          ? fallback
          : typeof fallback === "number"
            ? Number(value)
            : value;
    }

    // Preserve the original Dart fromMap defaults.
    result.deliveryPersonShareFromDeliveryOutOf100 =
      Number(map.deliveryPersonShareFromDeliveryOutOf100 ?? 10);
    result.deliveryanagerShareFromDeliveryOutOf100 =
      Number(map.deliveryanagerShareFromDeliveryOutOf100 ?? 70);

    return new DeliveryWeightConfigModel(result);
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    return DeliveryWeightConfigModel.fromMap(JSON.parse(source));
  }
}
