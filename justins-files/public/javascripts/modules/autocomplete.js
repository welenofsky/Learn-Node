function autocomplete(input, latInput, lngInput) {
    if (!input) return;
    const dropdown = new google.maps.places.Autocomplete(input);
    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        if (!place.geometry) return;
        latInput.value = place.geometry.location.lat();
        lngInput.value = place.geometry.location.lng();
    });

    input.on('keydown', (e) => {
        if (e.keyCode === 13) e.preventDefault();
    });

    console.log({ input, latInput, lngInput });
}

export default autocomplete;
