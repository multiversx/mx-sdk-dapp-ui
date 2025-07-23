import {
  getByDataTestIdDeep,
  getElementByDataTestIdDeep,
  queryByDataTestIdDeep,
} from './getElementByDataTestIdDeep.jest';

describe('getElementByDataTestIdDeep', () => {
  let mockElement: any;
  let mockShadowRoot: any;
  let mockDocument: any;

  beforeEach(() => {
    mockElement = {
      querySelector: jest.fn(),
      querySelectorAll: jest.fn(),
      shadowRoot: null,
    };

    mockShadowRoot = {
      querySelector: jest.fn(),
      querySelectorAll: jest.fn(),
    };

    mockDocument = {
      querySelector: jest.fn(),
      querySelectorAll: jest.fn(),
    };

    global.document = mockDocument as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find element in document root', () => {
    const testElement = { id: 'test-element' };
    mockDocument.querySelector.mockReturnValue(testElement);
    mockDocument.querySelectorAll.mockReturnValue([]);

    const result = getElementByDataTestIdDeep('test-id');

    expect(mockDocument.querySelector).toHaveBeenCalledWith('[data-testid="test-id"]');
    expect(result).toBe(testElement);
  });

  it('should find element in shadow root', () => {
    const testElement = { id: 'shadow-element' };
    const elementWithShadow = { ...mockElement, shadowRoot: mockShadowRoot };

    mockDocument.querySelector.mockReturnValue(null);
    mockDocument.querySelectorAll.mockReturnValue([elementWithShadow]);

    mockShadowRoot.querySelector.mockReturnValue(testElement);
    mockShadowRoot.querySelectorAll.mockReturnValue([]);

    const result = getElementByDataTestIdDeep('test-id');

    expect(result).toBe(testElement);
    expect(mockShadowRoot.querySelector).toHaveBeenCalledWith('[data-testid="test-id"]');
  });

  it('should return null when element not found', () => {
    mockDocument.querySelector.mockReturnValue(null);
    mockDocument.querySelectorAll.mockReturnValue([]);

    const result = getElementByDataTestIdDeep('non-existent');

    expect(result).toBeNull();
  });

  it('queryByDataTestIdDeep should return null when element not found', () => {
    mockDocument.querySelector.mockReturnValue(null);
    mockDocument.querySelectorAll.mockReturnValue([]);

    const result = queryByDataTestIdDeep('non-existent');

    expect(result).toBeNull();
  });

  it('getByDataTestIdDeep should throw when element not found', () => {
    mockDocument.querySelector.mockReturnValue(null);
    mockDocument.querySelectorAll.mockReturnValue([]);

    expect(() => getByDataTestIdDeep('non-existent')).toThrow('Unable to find element with data-testid: non-existent');
  });

  it('getByDataTestIdDeep should return element when found', () => {
    const testElement = { id: 'test-element' };
    mockDocument.querySelector.mockReturnValue(testElement);
    mockDocument.querySelectorAll.mockReturnValue([]);

    const result = getByDataTestIdDeep('test-id');

    expect(result).toBe(testElement);
  });
});

describe('getElementByDataTestIdDeep usage examples', () => {
  it('should demonstrate typical usage patterns', () => {
    const mockRoot = {
      querySelector: jest.fn().mockReturnValue({ id: 'found-element' }),
      querySelectorAll: jest.fn().mockReturnValue([]),
    };

    const result = getElementByDataTestIdDeep('test-id', mockRoot as any);

    expect(result).toEqual({ id: 'found-element' });
    expect(mockRoot.querySelector).toHaveBeenCalledWith('[data-testid="test-id"]');
  });
});
