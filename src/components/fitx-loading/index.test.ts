import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { FitxLoading } from './index';

describe('FitXLoading', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(FitxLoading);

    const loadingDiv = wrapper.find('[data-loading]');
    expect(loadingDiv.exists()).toBe(true);

    // Überprüfe Standardwerte
    expect(loadingDiv.attributes('data-theme')).toBeUndefined();
    expect(loadingDiv.attributes('aria-busy')).toBe('true');
    expect(loadingDiv.attributes('aria-live')).toBe('assertive');
    expect(loadingDiv.attributes('role')).toBe('progressbar');
    expect(loadingDiv.attributes('style')).toContain('animation-direction: normal');

    const label = wrapper.find('label.visually-hidden');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('wird geladen');
  });

  it('applies custom props correctly', () => {
    const wrapper = mount(FitxLoading, {
      props: {
        theme: 'dark',
        isActive: false,
        description: 'Lädt...',
        animationDirection: 'reverse',
      },
    });

    const loadingDiv = wrapper.find('[data-loading]');
    expect(loadingDiv.exists()).toBe(true);

    // Überprüfe benutzerdefinierte Werte
    expect(loadingDiv.attributes('data-theme')).toBe('dark');
    expect(loadingDiv.attributes('aria-busy')).toBe('false');
    expect(loadingDiv.attributes('aria-live')).toBe('assertive');
    expect(loadingDiv.attributes('role')).toBe('progressbar');
    expect(loadingDiv.attributes('style')).toContain('animation-direction: reverse');

    const label = wrapper.find('label.visually-hidden');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Lädt...');
  });

  it('generates a componentId when id is not provided', () => {
    const wrapper = mount(FitxLoading);

    const loadingDiv = wrapper.find('[data-loading]');
    expect(loadingDiv.exists()).toBe(true);

    const label = wrapper.find('label.visually-hidden');
    expect(label.exists()).toBe(true);
    expect(label.attributes('id')).toBeTruthy(); // Überprüfen, dass eine ID generiert wird
  });

  it('uses provided id for componentId', () => {
    const wrapper = mount(FitxLoading, {
      attrs: {
        id: 'custom-id',
      },
    });

    const loadingDiv = wrapper.find('[data-loading]');
    expect(loadingDiv.exists()).toBe(true);

    const label = wrapper.find('label.visually-hidden');
    expect(label.exists()).toBe(true);
    expect(label.attributes('id')).toBe('custom-id');
  });
});
