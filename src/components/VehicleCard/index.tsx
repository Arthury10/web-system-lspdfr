import { VehiclesDB } from "@/GtaDB/Vehicles/VehiclesDB";
import { useState } from "react";
import Image from 'next/image'


type vehicleDetailsType = {
  vehicleModel: string;
  licensePlate: string;
  ownerName?: string;
  isStolen?: boolean;
  insuranceStatus?: any;
  registrationStatus?: any;
  image?: any;
  primaryColor?: any;
  secondaryColor?: any;
}


export const VehicleCard = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState<vehicleDetailsType>();

  const [isLoading, setIsLoading] = useState(false);

  const handleSendPlate = async () => {
    console.log('licensePlate', licensePlate)
    if (licensePlate) {
      try {
        setIsLoading(true);
        await fetch(`http://localhost:9000/vehicleInformation/${licensePlate.toUpperCase()}`)
          .then((response) => response.json())
          .then((data: vehicleDetailsType) => {

            if (data && data.vehicleModel) {
              setVehicleDetails({
                licensePlate: data.licensePlate,
                vehicleModel: data.vehicleModel,
                isStolen: data.isStolen,
                ownerName: data.ownerName,
                insuranceStatus: data.insuranceStatus,
                registrationStatus: data.registrationStatus,
                primaryColor: data.primaryColor,
                secondaryColor: data.secondaryColor,
                image: VehiclesDB.find((vehicle) => vehicle.name.toLowerCase() === data.vehicleModel.toLowerCase())?.image
              });
            }

            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Erro ao buscar detalhes do veículo:', error);
          });
      } catch (err) {
        setIsLoading(false);
        console.error('Erro ao buscar detalhes do veículo:', err);
        setVehicleDetails({
          licensePlate: "ERRO",
          vehicleModel: "ERRO",
          isStolen: false,
          ownerName: "ERRO",
        });
      }

    }
  };
  return (
    <div className="container bg-slate-500 flex flex-col gap-10 m-auto p-6 my-6 rounded">
      <div className="w-auto flex gap-5 items-center justify-between">
        <div className="flex flex-col gap-4">
          <p><span className="text-black">Placa: </span>{vehicleDetails?.licensePlate}</p>
          <p><span className="text-black">Nome: </span>{vehicleDetails?.vehicleModel}</p>
          <p><span className="text-black">Nome: </span>{vehicleDetails?.vehicleModel}</p>
          <p><span className="text-black">Nome do Proprietario: </span>{vehicleDetails?.ownerName}</p>
          <p><span className="text-black">Estado do seguro: </span>{vehicleDetails?.insuranceStatus}</p>
          <p><span className="text-black">Estado do registro: </span>{vehicleDetails?.registrationStatus}</p>
          <p className="flex items-center">
            <span className="text-black">Cor primaria: </span>
            <div className={`w-4 h-2 ml-2 bg-[rgb(${vehicleDetails?.primaryColor})]`}> x</div>
          </p>
          <p><span className="text-black">Cor Secondaria: </span> <div className={`w-4 h-2 bg-rgb(50, 50, 50)`}> x</div></p>
          {vehicleDetails && <p><span className="text-black">Foi roubado: </span>{vehicleDetails?.isStolen ? "Sim" : "Não"}</p>}
        </div>
        {vehicleDetails?.image ? (
          <Image width={320} height={320} className="w-5/12 rounded" src={vehicleDetails?.image} alt={vehicleDetails?.vehicleModel} />
        ) : (
          <div className="w-5/12 h-[200px] rounded bg-black flex justify-center items-center">
            <p className="text-white">Imagem não encontrada</p>
          </div>
        )}
      </div>
      <div className="flex gap-4 justify-between w-full">
        <input className="p-5 rounded w-full" type="text" value={licensePlate} style={{ color: "red" }} onChange={(e) => setLicensePlate(e.target.value)} />
        <button disabled={isLoading} onClick={handleSendPlate} className="cursor-pointer bg-pink-500 p-5 rounded w-full">Buscar veículo</button>
      </div>
    </div>
  )
}