import { TestBed, ComponentFixture } from '@angular/core/testing';

import { DefaultLocalizationService } from './default-localization.service';
import { LocalizationSettings } from './localization-settings';
import { LocalStorageService } from '../storage';
import { localStorageServiceSpyFactory } from '@app/core/test-doubles';
import { LocalizationService } from './localization.service';
import { Locale } from './locales';
import { LocalStorageKeys } from '@app/shared';
import { en, de } from '@assets/locales';

describe('DefaultLocalizationService', () => {
  let service: DefaultLocalizationService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DefaultLocalizationService,
        {
          provide: LocalizationSettings,
          useClass: LocalizationSettings
        },
        {
          provide: LocalStorageService,
          useFactory: localStorageServiceSpyFactory
        }
      ]
    });

    service = TestBed.get(DefaultLocalizationService);
    localStorageServiceSpy = TestBed.get(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default locale when no locale id is saved in local storage', () => {
    localStorageServiceSpy.getItem.and.returnValue(undefined);

    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKeys.LOCALE
    );
    expect(service.getLocale()).toBe(new LocalizationSettings().defaultLocale);
  });

  it('should return default values when no locale id is saved in local storage', () => {
    localStorageServiceSpy.getItem.and.returnValue(undefined);

    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKeys.LOCALE
    );
    expect(service.getValues()).toEqual(en);
  });

  it('should return saved locale when locale id is saved in local storage', () => {
    localStorageServiceSpy.getItem.and.returnValue(Locale.DE);

    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKeys.LOCALE
    );
    expect(service.getLocale()).toBe(Locale.DE);
  });

  it('should return values of saved locale when locale id is saved in local storage', () => {
    localStorageServiceSpy.getItem.and.returnValues(Locale.DE.toString());

    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKeys.LOCALE
    );
    expect(service.getValues()).toEqual(de);
  });

  it('should change the locale correctly', () => {
    service.changeLocale(Locale.DE);

    expect(service.getLocale()).toBe(Locale.DE);
    expect(service.getValues()).toEqual(de);
    expect(localStorageServiceSpy.setItem).toHaveBeenCalledWith(
      LocalStorageKeys.LOCALE,
      Locale.DE
    );
  });
});
