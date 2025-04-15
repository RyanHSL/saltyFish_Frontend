export const sortService = (services, preference) => {
    switch(preference) {
        case "High to Low": 
            return [...services].sort((a, b) => b.rating.localeCompare(a.rating));
        case "Low to High":
            return [...services].sort((b, a) => b.rating.localeCompare(a.rating));
        default:
            return services;
    }
} 