import React, { useState, useEffect } from "react";
import {locationData} from "location_data";
import {InputForm} from "components"
import { useForm } from "react-hook-form";
function LocationForm() {
    const {handleSubmit, register, formState: {errors}, watch, setValue, reset} = useForm()
  const address = watch('address')
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    setProvinces(locationData.provinces);
  }, []);

  useEffect(() => {
    // Lấy danh sách quận tương ứng với tỉnh được chọn
    const selectedProvinceData = provinces.find(
      (province) => province.code === selectedProvince
    );

    if (selectedProvinceData) {
      const selectedDistricts = locationData.districts.filter(
        (district) => district.parent_code === selectedProvince
      );
      setDistricts(selectedDistricts);
      setSelectedDistrict("");
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [provinces, selectedProvince]);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <div className="flex gap-4">
      <select value={selectedProvince} onChange={handleProvinceChange} required>
        <option value="">Choose your Province</option>
        {provinces.map((province) => (
          <option key={province.code} value={province.code}>
            {province.name}
          </option>
        ))}
      </select>

      <select value={selectedDistrict} onChange={handleDistrictChange} required>
        <option value="">Choose your District</option>
        {districts.map((district) => (
          <option key={district.code} value={district.code}>
            {district.name}
          </option>
        ))}
      </select>

      <InputForm 
              label='Your Adress'
              register={register}
              errors={errors}
              id='address'
              validate={{
                required: 'Require this field'
  
              }}
              fullWidth
              placeholder='Enter Your Address'
            />

    </div>
  );
}

export default LocationForm;