"use client"
import { VehiclesDB } from "@/GtaDB/Vehicles/VehiclesDB";
import { useCallback, useState } from "react";
import Image from 'next/image'
import { InputField } from "../InputField";
import { FormProvider, useForm } from "react-hook-form";
import useDraggable from "@/common/hooks/useDraggable ";
import { useResizable } from "@/common/hooks/useResize";
import { VehicleModel } from "@/common/models/VehicleModel";
import { PedsDB } from "@/GtaDB/Peds/PedsDB";


type vehicleDetailsType = {
  ownerId: string;
  ownerName: string;
  ownerModelName: string;
  licensePlate: string;
  licensePlateType?: any;
  modelName: string;
  position?: any;
  abovePosition?: any;
  belowPosition?: any;
  forwardVector?: any;
  primaryColor?: any;
  secondaryColor?: any;
  isStolen?: boolean;
  isWanted?: boolean;
  insurenceStatus?: string;
  registrationStatus?: any;
  vehicleImage?: any;
  pedImage?: any;
  wantedId?: any;
}

export const VehicleCard = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState<vehicleDetailsType>();
  const [showModal, setShowModal] = useState(false);
  const { position, handleMouseDown, handleMouseMove, handleMouseUp } = useDraggable();
  const { size, handleResizeMouseDown } = useResizable();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      vehiclePlate: '',
      password: '1234',
    },
    mode: 'onChange',
  })

  const onSubmit = useCallback(
    async (values: any) => {
      console.log(values)
    },
    [],
  )

  const handleClose = () => {
    setShowModal(false);
    // Resetar posição e tamanho, se necessário
  };

  const handleOutsideClick = (e: any) => {
    if (e.target === e.currentTarget) {
      console.log('Clicou fora')
    }
  };

  const handleSendPlate = async () => {
    console.log('licensePlate', licensePlate)
    if (licensePlate) {
      try {
        setIsLoading(true);
        await fetch(`http://localhost:9000/vehicleInformation/${licensePlate.toUpperCase()}`)
          .then((response) => response.json())
          .then((data: VehicleModel) => {

            if (data && data.ModelName) {
              setVehicleDetails({
                ownerId: data.OwenerId,
                ownerModelName: data.OwnerModelName,
                licensePlate: data.LicensePlate,
                modelName: data.ModelName,
                isStolen: data.IsStolen,
                ownerName: data.OwnerName,
                insurenceStatus: data.InsurenceStatus,
                registrationStatus: data.RegistrationStatus,
                primaryColor: data.PrimaryColor,
                secondaryColor: data.SecondaryColor,
                abovePosition: data.AbovePosition,
                belowPosition: data.BelowPosition,
                forwardVector: data.ForwardVector,
                wantedId: data.WantedId,
                isWanted: data.IsWanted,
                licensePlateType: data.LicensePlateType,
                position: data.Position,
                vehicleImage: VehiclesDB.find((vehicle) => vehicle.name.toLowerCase() === data.ModelName.toLowerCase())?.image,
                pedImage: PedsDB.find((ped) => ped.name.toLowerCase() === data.OwnerModelName.toLowerCase())?.image,
              });
              form.setValue('vehiclePlate', data.LicensePlate.toUpperCase());
            }

            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Erro ao buscar detalhes do veículo:', error);
          });
      } catch (err) {
        setIsLoading(false);
        console.error('Erro ao buscar detalhes do veículo:', err);
      }
    }
  };

  async function createFine(fine: any) {
    const response = await fetch('http://localhost:9000/fines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fine),
    });
    const data = await response.json();
    return data;
  }

  async function FineCreator() {
    const fine = {
      LicensePlate: vehicleDetails?.licensePlate,
      Offense: "Velocidade excessiva",
      Amount: 100,
    };
    const result = await createFine(fine);
    console.log(result); // Lidar com o resultado como desejado
  }


  return (
    <div className="container bg-slate-500 flex flex-col gap-10 m-auto p-6 my-6 rounded relative">
      <div className="w-auto flex gap-5 items-center justify-between">
        <div className="flex flex-col gap-4">
          <p><span className="text-black">Placa: </span>{vehicleDetails?.licensePlate}</p>
          <p><span className="text-black">Nome: </span>{vehicleDetails?.modelName}</p>
          <p><span className="text-black">Nome do Proprietario: </span>{vehicleDetails?.ownerName}</p>
          <p><span className="text-black">Estado do seguro: </span>{vehicleDetails?.insurenceStatus}</p>
          <p><span className="text-black">Estado do registro: </span>{vehicleDetails?.registrationStatus}</p>
          <p className="flex items-center">
            <span className="text-black">Cor primaria: </span>
          </p>
          <p><span className="text-black">Cor Secondaria: </span></p>
          {vehicleDetails && <p><span className="text-black">Foi roubado: </span>{vehicleDetails?.isStolen ? "Sim" : "Não"}</p>}
        </div>
        {vehicleDetails?.vehicleImage ? (
          <div className="flex gap-3 min-w-[320px]">
            <Image width={300} height={160} className="w-5/12 rounded" src={vehicleDetails?.vehicleImage} alt={vehicleDetails?.modelName} />
            <Image width={300} height={160} className="w-5/12 rounded" src={vehicleDetails?.pedImage} alt={vehicleDetails?.ownerModelName} />
          </div>
        ) : (
          <div className="w-5/12 h-[200px] rounded bg-black flex justify-center items-center">
            <p className="text-white">Imagem não encontrada</p>
          </div>
        )}
      </div>
      <div className="flex gap-4 justify-between w-full">
        <input className="p-5 rounded w-full" type="text" value={licensePlate.toUpperCase()} style={{ color: "red" }} onChange={(e) => setLicensePlate(e.target.value)} />
        <button onClick={handleSendPlate} className="cursor-pointer bg-pink-500 p-5 rounded w-full">Buscar veículo</button>
        <button onClick={() => setShowModal(true)} className="cursor-pointer bg-pink-500 p-5 rounded w-full">Criar multa</button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center" onClick={handleOutsideClick}>
          <div className="absolute bg-blue-300 shadow-md rounded-md p-8 w-3/4 h-3/4" style={{ transform: `translate(${position.x}px, ${position.y}px)`, ...size }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
                <h1 className="text-2xl font-bold text-center">Criar multa</h1>
              </div>
              <div>
                <button onClick={handleClose}>Fechar</button>
              </div>
            </div>
            <FormProvider {...form}>
              <div className="flex flex-col justify-between h-full p-8">
                <div className="grid grid-cols-2 gap-6 justify-between">
                  <div>
                    <InputField name={"vehiclePlate"} label="Placa do veículo: " />
                    <InputField name={"amount"} label="Valor: " />
                    <InputField name="status" label="Status: " />
                    <InputField name="removeLicense" label="Remover Licensa: " />
                  </div>
                  <div className="flex flex-col rounded-md">
                    <InputField name={"reason"} label="Razão: " />
                    <textarea name="description" className="h-full rounded-sm"></textarea>
                  </div>
                </div>
                <button className="cursor-pointer bg-pink-500 p-5 rounded w-full" onClick={FineCreator}>Criar</button>
              </div>
            </FormProvider>
            <div className="absolute right-0 bottom-0 cursor-se-resize bg-slate-700" onMouseDown={handleResizeMouseDown} style={{ width: '20px', height: '20px' }}></div>
          </div>
        </div>
      )}
    </div>
  )
}