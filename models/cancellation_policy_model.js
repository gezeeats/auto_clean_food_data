
export class CancellationPolicyModel {
  constructor({
    shortTermWindowHours = [1, 24, 24, 168],
    shortTermCancelLimits = [3, 5, 8, 12],
    shortTermBlockMinutes = [45, 180, 720, 1440],
    longTermWindowDays = [30, 90, 180, 365],
    longTermCancelLimits = [20, 50, 80, 120],
    longTermBlockDays = [3, 14, 30, 90],
    lateCancelLimits24h = [3, 2],
    lateCancelBlockMinutes = [1440, 1440],
  } = {}) {
    this.shortTermWindowHours = shortTermWindowHours;
    this.shortTermCancelLimits = shortTermCancelLimits;
    this.shortTermBlockMinutes = shortTermBlockMinutes;
    this.longTermWindowDays = longTermWindowDays;
    this.longTermCancelLimits = longTermCancelLimits;
    this.longTermBlockDays = longTermBlockDays;
    this.lateCancelLimits24h = lateCancelLimits24h;
    this.lateCancelBlockMinutes = lateCancelBlockMinutes;
  }

  copyWith(values = {}) {
    const current = this.toMap();

    return new CancellationPolicyModel({
      ...current,
      ...Object.fromEntries(
        Object.entries(values).filter(([, value]) => value != null),
      ),
    });
  }

  toMap() {
    return {
      shortTermWindowHours: this.shortTermWindowHours,
      shortTermCancelLimits: this.shortTermCancelLimits,
      shortTermBlockMinutes: this.shortTermBlockMinutes,
      longTermWindowDays: this.longTermWindowDays,
      longTermCancelLimits: this.longTermCancelLimits,
      longTermBlockDays: this.longTermBlockDays,
      lateCancelLimits24h: this.lateCancelLimits24h,
      lateCancelBlockMinutes: this.lateCancelBlockMinutes,
    };
  }

  static fromMap(map = {}) {
    const defaults = new CancellationPolicyModel().toMap();

    return new CancellationPolicyModel(
      Object.fromEntries(
        Object.entries(defaults).map(([key, fallback]) => [
          key,
          Array.isArray(map[key]) ? map[key].map(Number) : fallback,
        ]),
      ),
    );
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    return CancellationPolicyModel.fromMap(JSON.parse(source));
  }
}
