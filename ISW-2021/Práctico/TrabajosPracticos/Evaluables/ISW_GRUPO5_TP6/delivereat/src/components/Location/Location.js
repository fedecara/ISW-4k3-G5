import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  Spinner,
  Subtitle,
  SubtitleLight,
  TitleLight,
} from "../../globalStyle";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import mapStyle from "../../mapStyle";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

//Styled Components
import {
  BeginContainer,
  ButtonContainer,
  Card,
  CardBox,
  CardCheckIcon,
  CardGroup,
  CardIcon,
  CardSeparator,
  CardSubTitle,
  CardTitle,
  CheckBoxLabel,
  DateInput,
  ErrorTag,
  GoBack,
  InputGroup,
  InputGroupIcon,
  InputIcon,
  InputSearch,
  LabelInput,
  LocationContainer,
  LocationInput,
  MapButton,
  NextButton,
  SearchButton,
  SearchContainer,
  SearchIcon,
  SearchOption,
  SearchPopOver,
  SuccessContainer,
  SuccessIcon,
  SuccessSubtitle,
  SuccessTitle,
} from "./Location.elements";

//Import de Iconos
import SearchIconImg from "../../images/search_map_icon.svg";
import GoBackIcon from "../../images/back.svg";
import StoreIcon from "../../images/store-icon.svg";
import BoxIcon from "../../images/box-icon.svg";
import mastercardIcon from "../../images/mastercard-icon.svg";
import visaIcon from "../../images/visa-icon.svg";
import CloudUploadIcon from "../../images/cloud-upload.svg";
import CloudUploadedIcon from "../../images/cloud-uploaded.svg";
import Loader from "../../images/loader.svg";
import flagIcon from "../../images/flag-icon.svg";
import markerIcon from "../../images/marker-icon.svg";
import successIcon from "../../images/success-icon.svg";

//Componentes
import Checkbox from "../CheckBox";
import InputText from "../InputText";
import validation from "../Validation";

//Librerias de google maps necesarias
import { libraries } from "../../libraries";

require("dotenv").config();

const Location = () => {
  //Definicion de UseStates
  const [currentOption, setCurrentOption] = useState(1); //posicion actual de pantalla
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 }); //latitud y longitud de la direccion destino
  const [latlngLocal, setLatlngLocal] = useState({ lat: 0, lng: 0 }); //latitud y longitud de la direccion origen
  const [marker, setMarker] = useState([]); //marcador en mapa para confirmar la posicion exacta
  const [inmediato, setInmediato] = useState(false); //tipo de envio

  const [direcciones, setDirecciones] = useState(null); //rutas de google desde origen a destino
  const [imageLoaded, setImageLoaded] = useState(1);
  const [nombreImagen, setNombreImagen] = useState("Imagen del Producto");
  const [direccion, setDireccion] = useState(null);
  const [direccionLocal, setDireccionLocal] = useState("");

  const [datosDireccionDestino, setDatosDireccionDestino] = useState({
    direccionDestino: "",
    depto: "",
    piso: "",
    torre: "",
  });
  const [datosDireccionOrigen, setDatosDireccionOrigen] = useState({
    direccionOrigen: "",
    costoProducto: "",
    producto: "",
    total: "",
  });
  const [datosTarjeta, setDatosTarjeta] = useState({
    tarjeta: "",
    titular: "",
    vencimiento: "",
    cvc: "",
  });
  const [errores, setErrores] = useState({});

  const [costoEnvio, setCostoEnvio] = useState(null);
  const [tipoTarjeta, setTipoTarjeta] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState(new Date());

  const [checkCardSelected, setCheckCardSelected] = useState(0);

  const mapRef = useRef();
  const inputFile = useRef();

  //Manejador de cambios en input y errores

  const handleChangeDestino = (event) => {
    setDatosDireccionDestino({
      ...datosDireccionDestino,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeOrigen = (event) => {
    setDatosDireccionOrigen({
      ...datosDireccionOrigen,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeTarjeta = (event) => {
    setDatosTarjeta({
      ...datosTarjeta,
      [event.target.name]: event.target.value,
    });
  };

  const handleDireccionDestino = async () => {
    let erroresEncontrados = await validation(datosDireccionDestino);
    setErrores(erroresEncontrados);
    if (!direccion) {
      setErrores({
        ...erroresEncontrados,
        direccionDestino: "Seleccione una direccion",
      });
    }
    if (!errores.depto && !errores.piso && direccion) {
      nextOption();
      setMarker([
        {
          lat: latLng.lat,
          lng: latLng.lng,
        },
      ]);
      setErrores({});
      console.log(errores);
    }
  };

  const handleDireccionOrigen = async () => {
    let erroresEncontrados = await validation(datosDireccionOrigen);
    console.log(erroresEncontrados);
    setErrores(erroresEncontrados);
    if (!direccionLocal) {
      setErrores({
        ...erroresEncontrados,
        direccionOrigen: "Seleccione la direccion del Local",
      });
    }
    if (!errores.producto && !errores.costoProducto && direccionLocal) {
      nextOption();
      setMarker([
        {
          lat: latlngLocal.lat,
          lng: latlngLocal.lng,
        },
      ]);
      setErrores({});
    }
  };
  const handleTarjeta = async () => {
    let erroresEncontrados = await validation(datosTarjeta);
    console.log(erroresEncontrados);
    setErrores(erroresEncontrados);
    if (checkCardSelected === 2) {
      if (
        !erroresEncontrados.tarjeta &&
        !erroresEncontrados.titular &&
        !erroresEncontrados.vencimiento &&
        !erroresEncontrados.cvc
      ) {
        nextOption();
      }
    } else {
      nextOption();
    }
  };

  useEffect(() => {
    setTipoTarjeta("");
    if (datosTarjeta.tarjeta.charAt(0) === "4") {
      setTipoTarjeta("visa");
    }
    if (datosTarjeta.tarjeta.charAt(0) === "5") {
      setTipoTarjeta("mastercard");
    }
  }, [datosTarjeta.tarjeta.charAt(0)]);

  //Api key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDH75bfzU1Vy1VqSOAPBrVZ_OUCOlnLE8E",
    libraries: libraries,
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  //Funciones para ir avanzando y volviendo
  const nextOption = () => {
    setCurrentOption(currentOption + 1);
    console.log(latLng, latlngLocal);
  };

  const backOption = () => {
    if (currentOption !== 1) {
      setCurrentOption(currentOption - 1);
    }
  };

  //Definicion del Mapa
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
  };

  //Simulacion de carga de imagen
  const imageLoading = () => {
    var xd = inputFile.current.files[0].name;
    setImageLoaded(2);
    setTimeout(() => {
      setImageLoaded(3);
      setNombreImagen(xd);
    }, 3000);
  };

  if (loadError) return "Error al cargar maps";
  if (!isLoaded) return "No esta cargado todavia!";

  switch (currentOption) {
    case 1:
      return (
        <>
          <Container>
            <LocationContainer>
              <SearchIcon src={SearchIconImg} />
              <Subtitle>Bienvenido a DeliverEat!</Subtitle>
              <SubtitleLight>¿A donde enviamos tu pedido?</SubtitleLight>

              <Search
                error={errores.direccionDestino}
                setLatLng={setLatLng}
                setDireccion={setDireccion}
                name="direccionDestino"
                placeholder="Ingrese una Ciudad y Direccion*"
              />
              {errores.direccionDestino && (
                <ErrorTag>{errores.direccionDestino}</ErrorTag>
              )}
              <LocationInput
                className={errores.depto && "error"}
                value={datosDireccionDestino.depto}
                name="depto"
                onChange={handleChangeDestino}
                placeholder="Departamento*"
                // mask="a"
              />
              {errores.depto && <ErrorTag>{errores.depto}</ErrorTag>}

              <InputGroup>
                <LocationInput
                  className={errores.piso ? "input-group error" : "input-group"}
                  value={datosDireccionDestino.piso}
                  onChange={handleChangeDestino}
                  placeholder="Piso*"
                  name="piso"
                  type="number"
                />

                <LocationInput
                  className={
                    errores.torre ? "input-group error" : "input-group"
                  }
                  value={datosDireccionDestino.torre}
                  onChange={handleChangeDestino}
                  placeholder="Torre"
                />
              </InputGroup>
              {errores.piso && <ErrorTag>{errores.piso}</ErrorTag>}

              <SearchButton
                onClick={() => {
                  handleDireccionDestino();
                }}
              >
                Buscar
              </SearchButton>
            </LocationContainer>
          </Container>
        </>
      );
    case 2:
      return (
        <>
          <GoBack src={GoBackIcon} onClick={() => backOption()} />
          <MapButton
            onClick={() => {
              nextOption();
              setLatLng(marker[0]);
            }}
          >
            Confirmar
          </MapButton>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={18}
            center={latLng}
            options={options}
            onLoad={onMapLoad()}
            onClick={(event) => {
              setMarker([
                {
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng(),
                },
              ]);
            }}
          >
            {marker.map((marker) => (
              <Marker position={{ lat: marker.lat, lng: marker.lng }} />
            ))}
          </GoogleMap>
        </>
      );
    case 3:
      return (
        <>
          <GoBack src={GoBackIcon} onClick={() => backOption()} />
          <Container>
            <BeginContainer>
              <TitleLight>Empecemos </TitleLight>
              <SubtitleLight>Elija que tipo de pedido realizar</SubtitleLight>
              <Card>
                <CardIcon src={StoreIcon} />
                <CardTitle>Locales Adheridos </CardTitle>
                <CardSubTitle>
                  Quiero elejir productos dentro de los locales adheridos
                </CardSubTitle>
              </Card>
              <Card>
                <CardIcon src={BoxIcon} />
                <CardTitle>Pedido de lo que sea </CardTitle>
                <CardSubTitle>
                  Quiero pedir un producto a un local que no se encuentra
                  adherido
                </CardSubTitle>
              </Card>
              <ButtonContainer>
                <NextButton onClick={() => nextOption()}>Continuar</NextButton>
              </ButtonContainer>
            </BeginContainer>
          </Container>
        </>
      );
    case 4:
      return (
        <>
          <GoBack src={GoBackIcon} onClick={() => backOption()} />
          <Container>
            <BeginContainer>
              <TitleLight>Datos del Local</TitleLight>
              <SubtitleLight className="text-start">
                Complete los datos del Local al cual desea pedir
              </SubtitleLight>
              <Search
                error={errores.direccionOrigen}
                setLatLng={setLatlngLocal}
                setDireccion={setDireccionLocal}
                placeholder="Direccion del Local*"
              />
              {errores.direccionOrigen && (
                <ErrorTag>{errores.direccionOrigen}</ErrorTag>
              )}
              <LocationInput
                className={errores.producto && "error"}
                value={datosDireccionOrigen.producto}
                name="producto"
                onChange={handleChangeOrigen}
                placeholder="Producto deseado*"
              />
              {errores.producto && <ErrorTag>{errores.producto}</ErrorTag>}
              <LocationInput
                className={errores.costoProducto && "error"}
                value={datosDireccionOrigen.costoProducto}
                name="costoProducto"
                onChange={handleChangeOrigen}
                placeholder="Costo del Producto*"
                type="number"
              />
              {errores.costoProducto && (
                <ErrorTag>{errores.costoProducto}</ErrorTag>
              )}
              <InputGroup className="icon">
                {imageLoaded == 1 || imageLoaded == 3 ? (
                  <InputIcon
                    src={
                      imageLoaded == 1
                        ? CloudUploadIcon
                        : imageLoaded == 2
                        ? Loader
                        : CloudUploadedIcon
                    }
                  />
                ) : (
                  <Spinner />
                )}

                <LabelInput>
                  {nombreImagen}
                  <LocationInput
                    type="file"
                    value=""
                    className="search"
                    ref={inputFile}
                    onChange={() => {
                      imageLoading();
                    }}
                  />
                </LabelInput>
              </InputGroup>
              <DateInput
                disabled={inmediato}
                onChange={setFechaEntrega}
                value={fechaEntrega}
              />
              <CheckBoxLabel>
                <Checkbox
                  checked={inmediato}
                  onChange={() => {
                    setInmediato(!inmediato);
                  }}
                />
                <span style={{ marginLeft: 8 }}>Entrega Inmediata</span>
              </CheckBoxLabel>

              <ButtonContainer>
                <NextButton
                  onClick={() => {
                    handleDireccionOrigen();
                  }}
                >
                  Continuar
                </NextButton>
              </ButtonContainer>
            </BeginContainer>
          </Container>
        </>
      );

    case 5:
      return (
        <>
          <GoBack src={GoBackIcon} onClick={() => backOption()} />
          <MapButton
            onClick={() => {
              nextOption();
              setLatlngLocal(marker[0]);
            }}
          >
            Confirmar
          </MapButton>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={18}
            center={latlngLocal}
            options={options}
            onLoad={onMapLoad()}
            onClick={(event) => {
              setMarker([
                {
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng(),
                },
              ]);
            }}
          >
            {marker.map((marker) => (
              <Marker position={{ lat: marker.lat, lng: marker.lng }} />
            ))}
          </GoogleMap>
        </>
      );
    case 6:
      const getDirecciones = () => {
        const google = window.google;
        const directionsService = new google.maps.DirectionsService();
        var costoEnvioTotal = 0;
        directionsService.route(
          {
            origin: latlngLocal,
            destination: latLng,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirecciones(result);
              costoEnvioTotal =
                result.routes[0].legs[0].distance.value * 0.0325;
              setCostoEnvio(parseInt(Number(costoEnvioTotal).toFixed(2)));
            } else {
              console.error("error fetching directions", result, status);
            }
          }
        );
      };

      if (direcciones === null && latLng !== null && latlngLocal !== null) {
        getDirecciones();
        console.log(costoEnvio);
      }
      return (
        <>
          <GoBack src={GoBackIcon} onClick={() => backOption()} />
          <MapButton onClick={() => nextOption()}>Confirmar</MapButton>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={18}
            center={latLng}
            options={options}
          >
            {direcciones !== null && (
              <DirectionsRenderer
                options={{
                  directions: direcciones,
                }}
                onLoad={(directionsRenderer) => {
                  console.log(
                    "DirectionsRenderer onLoad directionsRenderer: ",
                    directionsRenderer
                  );
                }}
                onUnmount={(directionsRenderer) => {
                  console.log(
                    "DirectionsRenderer onUnmount directionsRenderer: ",
                    directionsRenderer
                  );
                }}
              />
            )}
          </GoogleMap>
        </>
      );
    case 7:
      return (
        <>
          <GoBack src={GoBackIcon} onClick={() => backOption()} />
          <Container className="full-container">
            <BeginContainer>
              <TitleLight>Metodo de Pago</TitleLight>
              <SubtitleLight className="text-start">
                Seleccione un metodo de pago
              </SubtitleLight>
              <CardBox
                className={checkCardSelected === 1 ? "selected" : ""}
                onClick={() => {
                  setCheckCardSelected(1);
                }}
              >
                <CardCheckIcon />
                <CardTitle>Efectivo en entrega</CardTitle>
              </CardBox>
              <CardBox
                className={
                  "has-icon " + (checkCardSelected === 2 ? "selected" : "")
                }
                onClick={() => {
                  setCheckCardSelected(2);
                }}
              >
                <CardCheckIcon />
                <CardIcon src={mastercardIcon}></CardIcon>
                <CardIcon src={visaIcon}></CardIcon>
              </CardBox>

              {checkCardSelected === 2 ? (
                <>
                  <InputGroup className="icon-group">
                    <InputText
                      value={datosTarjeta.tarjeta}
                      onChange={handleChangeTarjeta}
                      name="tarjeta"
                      label="Numero de Tarjeta"
                      placeholder="0000 0000 0000 0000"
                      error={errores.tarjeta}
                      mask="9999 9999 9999 9999"
                    />
                    {tipoTarjeta === "visa" ? (
                      <InputGroupIcon src={visaIcon} />
                    ) : tipoTarjeta === "mastercard" ? (
                      <InputGroupIcon src={mastercardIcon} />
                    ) : (
                      <></>
                    )}
                    {/* <InputGroupIcon src={mastercardIcon} /> */}
                  </InputGroup>
                  {errores.tarjeta && <ErrorTag>{errores.tarjeta}</ErrorTag>}

                  <InputText
                    value={datosTarjeta.titular}
                    onChange={handleChangeTarjeta}
                    name="titular"
                    label="Titular de la Tarjeta"
                    placeholder="Nombre y Apellido"
                    error={errores.titular}
                  />
                  {errores.titular && <ErrorTag>{errores.titular}</ErrorTag>}
                  <InputGroup>
                    <InputText
                      clase="input-group"
                      label="Fecha de Expiracion"
                      placeholder="MM/YY"
                      error={errores.vencimiento}
                      mask="99/99"
                      name="vencimiento"
                      value={datosTarjeta.vencimiento}
                      onChange={handleChangeTarjeta}
                    />
                    <InputText
                      clase="input-group"
                      label="CVV/CVC"
                      placeholder="123"
                      error={errores.cvc}
                      mask="999"
                      name="cvc"
                      value={datosTarjeta.cvc}
                      onChange={handleChangeTarjeta}
                    />
                  </InputGroup>
                </>
              ) : (
                <></>
              )}

              <ButtonContainer>
                <NextButton
                  onClick={() => {
                    handleTarjeta();
                  }}
                >
                  Continuar
                </NextButton>
              </ButtonContainer>
            </BeginContainer>
          </Container>
        </>
      );

    case 8:
      var total = 0;
      if (datosDireccionOrigen.total === "") {
        total =
          parseInt(costoEnvio) + parseInt(datosDireccionOrigen.costoProducto);

        setDatosDireccionOrigen({
          ...datosDireccionOrigen,
          total: total,
        });
      }
      return (
        <>
          <Container>
            <GoBack src={GoBackIcon} onClick={() => backOption()} />
            <BeginContainer>
              <TitleLight>Confirmación</TitleLight>
              <SubtitleLight className="text-start bold">
                Detalles de envio
              </SubtitleLight>
              <CardBox className="outlined">
                <CardIcon src={markerIcon} />
                <CardGroup>
                  <CardSubTitle>Origen</CardSubTitle>
                  <CardTitle>{direccionLocal}</CardTitle>
                </CardGroup>
              </CardBox>
              <CardBox className="outlined mb-4">
                <CardIcon className="sm" src={flagIcon} />
                <CardGroup>
                  <CardSubTitle>Origen</CardSubTitle>
                  <CardTitle>{direccion}</CardTitle>
                </CardGroup>
              </CardBox>
              <SubtitleLight className="text-start bold">
                Detalles de pedido
              </SubtitleLight>
              <CardBox className="detail">
                <CardGroup>
                  <CardSubTitle>Subtotal</CardSubTitle>
                  <CardTitle>${datosDireccionOrigen.costoProducto}</CardTitle>
                </CardGroup>
                <CardGroup>
                  <CardSubTitle>Costo de Envio</CardSubTitle>
                  <CardTitle>${costoEnvio}</CardTitle>
                </CardGroup>
                <CardSeparator />
                <CardGroup>
                  <CardTitle>Total</CardTitle>
                  <CardTitle>${datosDireccionOrigen.total}</CardTitle>
                </CardGroup>
              </CardBox>
              <ButtonContainer>
                <NextButton onClick={() => nextOption()}>Confirmar</NextButton>
              </ButtonContainer>
            </BeginContainer>
          </Container>
        </>
      );

    case 9:
      return (
        <>
          <GoBack
            src={GoBackIcon}
            className="bg-white"
            onClick={() => backOption()}
          />
          <Container className="bg-success">
            <SuccessContainer>
              <SuccessIcon src={successIcon} />
              <SuccessTitle>Pedido Confirmado</SuccessTitle>
              <SuccessSubtitle>
                Gracias por realizar el pedido. Recibira un email de
                confirmacion a la brevedad.
              </SuccessSubtitle>
              <ButtonContainer>
                <SearchButton
                  onClick={() => {
                    setCurrentOption(1);
                    setErrores({});
                  }}
                  className="btn-white"
                >
                  Volver al Inicio
                </SearchButton>
              </ButtonContainer>
            </SuccessContainer>
          </Container>
        </>
      );

    default:
      return <></>;
  }
};

const Search = ({ setLatLng, setDireccion, placeholder, error }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => -31.40506, lng: () => -64.171898 },
      radius: 200 * 1000,
    },
  });

  return (
    <SearchContainer
      onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();
        try {
          setDireccion(address);
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          setLatLng({
            lat: lat,
            lng: lng,
          });
        } catch (error) {
          console.log("Error al obtener address");
        }
      }}
    >
      <InputSearch
        className={error && "error"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder={placeholder}
      ></InputSearch>
      <SearchPopOver>
        {status === "OK" &&
          data.map(({ id, description }) => (
            <SearchOption key={id} value={description}></SearchOption>
          ))}
      </SearchPopOver>
    </SearchContainer>
  );
};

export default Location;
