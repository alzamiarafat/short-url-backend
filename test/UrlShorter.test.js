const ShortURLService = require('../src/services/UrlService');
const CommonService = require('../src/services/CommonService');
const UrlRepository = require('../src/repositories/UrlRepository');
// Mock the methods of CommonService and UrlRepository
jest.mock('../src/services/CommonService');
jest.mock('../src/repositories/UrlRepository');

test('should generate a unique short URL for a given long URL', async () => {
    const req = {
        body: { original_url: 'https://www.example.com' },
        headers: { host: 'localhost:3000' }
    };

    // Mock CommonService methods
    CommonService.hashUrlToNumber.mockReturnValue(123456789);
    CommonService.encodeBase62.mockReturnValue('abc123');
    CommonService.generateUniqueCodeForUrl.mockReturnValue('abc123');

    // Mock UrlRepository methods
    UrlRepository.getByCode.mockResolvedValue(null);  // URL not found, so it'll be created
    UrlRepository.store.mockResolvedValue({
        original_url: 'https://www.example.com',
        url_code: 'abc123',
        short_url: 'localhost:3000/abc123'
    });

    // Generate the short URL
    const shortURL = await ShortURLService.generator(req);

    expect(shortURL).toBeDefined();
    expect(shortURL.short_url).toBe('localhost:3000/abc123');

    // Verify the repository's store method was called with the correct data
    expect(UrlRepository.store).toHaveBeenCalledWith({
        original_url: 'https://www.example.com',
        url_code: 'abc123',
        short_url: 'localhost:3000/abc123'
    });
}, 10000);

test('should return the original URL when the code exists', async () => {
    const req = { params: { code: 'abc123' } };

    // Mock UrlRepository to return the original URL for the short code
    UrlRepository.getByCode.mockResolvedValue({
        original_url: 'https://www.example.com'
    });

    // Call the redirect function
    const result = await ShortURLService.redirect(req);

    // Expect that the result is the original URL object
    expect(result).toBeDefined();
    expect(result.original_url).toBe('https://www.example.com');
});