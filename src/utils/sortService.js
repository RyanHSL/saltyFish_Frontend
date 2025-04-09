export const sortService = (services, preference) => {
    switch(preference) {
        case "High to Low": 
            return [...services].sort((a, b) => b.priority.localeCompare(a.priority));
        case "Low to High":
            return [...services].sort((b, a) => b.priority.localeCompare(a.priority));
        default:
            return services;
    }
} 