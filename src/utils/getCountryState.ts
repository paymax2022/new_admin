import countriesData from '@/utils/countries.json';
import statesData from '@/utils/states.json';

export const getCountries = () => {
    return countriesData.map((country) => {
        return {
            name: country.name,
            code: country.iso2,
        };
    });
};

export const getStatesByCountryCode = (countryCode: string) => {
    const countryStatesData = statesData.filter((state) => state.country_code === countryCode);
    return countryStatesData.map((state) => {
        return {
            name: state.name,
            code: state.state_code || state.name,
        };
    });
};
