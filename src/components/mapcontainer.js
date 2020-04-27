import React from "react"
import {Map, InfoWindow, Marker, GoogleApiWrapper, Listing} from 'google-maps-react';
  
export class MapContainer extends React.Component {

    state = {
        places: null,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    fetchPlaces = (mapProps, map) => {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);

        fetch('/.netlify/functions/places').then((response) => {
            return response.json();
          }).then((response) => {
            console.log(response);
            this.setState({places: response});
        });
    }

    onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
 
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            console.log("onMapClicked");
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {

        const containerStyle = {
            position: 'relative',  
            width: '100%',
            height: '90vh'
          }

        const markers = (this.state.places && this.state.places.length > 0) ? this.state.places.map((place, key) => {
            return (
                <Marker
                    key={key}
                    onClick={this.onMarkerClick}
                    name={place.data.Name}
                    position={{lat: place.data.Y, lng: place.data.X}} >
                </Marker>
            )
        }) : null;

        return (
          <Map 
            style={containerStyle}
            google={this.props.google} 
            onClick={this.onMapClicked}
            onReady={this.fetchPlaces}
            initialCenter={{
                lat: 0,
                lng: 0,
            }}
            zoom={3}
            >
                {markers}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose}>
                        
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                </InfoWindow>
          </Map>
        );
      }

}
 
export default GoogleApiWrapper({
  apiKey: (process.env.GOOGLE_MAPS_API_KEY)
})(MapContainer)