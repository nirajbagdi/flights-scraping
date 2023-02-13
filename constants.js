const SOURCE = 'BOM';
const DESTINATION = 'DEL';
const DEPART_DATE = '2023-03-15';
const RETURN_DATE = '2023-03-22';
const TRAVELLER = {
    class: 'economy',
    adults: 1,
    children: 0
};

// const URL = `https://www.skyscanner.co.in/transport/flights/${SOURCE.toLowerCase()}/${DESTINATION.toLowerCase()}/${DEPART_DATE}/${RETURN_DATE}/?adultsv2=${+TRAVELLER.adults}&cabinclass=${TRAVELLER.class.toLowerCase()}&childrenv2=${+TRAVELLER.children}`;

const URL = `https://www.kayak.co.in/flights/${SOURCE}-${DESTINATION}/${DEPART_DATE}`;

export default {
    SOURCE,
    DESTINATION,
    DEPART_DATE,
    RETURN_DATE,
    TRAVELLER,
    URL
};
