
export class LanguageVersionModel {
  static languageKey = "language";
  static languageVersionKey = "languageVersion";

  constructor({
    languageVersion = [""],
    language = [""],
  } = {}) {
    this.languageVersion = languageVersion;
    this.language = language;
  }

  copyWith({
    languageVersion,
    language,
  } = {}) {
    return new LanguageVersionModel({
      languageVersion: languageVersion ?? this.languageVersion,
      language: language ?? this.language,
    });
  }

  toMap() {
    return {
      languageVersion: this.languageVersion,
      language: this.language,
    };
  }

  static fromMap(map = {}) {
    return new LanguageVersionModel({
      languageVersion: Array.isArray(map.languageVersion)
        ? map.languageVersion
        : [""],
      language: Array.isArray(map.language)
        ? map.language
        : [""],
    });
  }

  toJson() {
    return JSON.stringify(this.toMap());
  }

  static fromJson(source) {
    return LanguageVersionModel.fromMap(JSON.parse(source));
  }
}
