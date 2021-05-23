import Button from '../../components/Button/Button';
import './CropPredictionPage.css';
import InputField from '../../components/InputField/InputField';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import axios from 'axios';

const CropPredictionPage = () => {
  const { t } = useTranslation();
  const [userInputs, setUserInputs] = useState({});
  const [suggestedCrop, setSuggestedCrop] = useState('');

  const handleUserInputs = (e) => {
    setSuggestedCrop('');
    const id = e.target.id;
    const value = e.target.value.replace(/[a-zA-Z!@#$%^&*()+/=,-]/, '');
    setUserInputs({ ...userInputs, [id]: value });
  };

  // !@#$%^&*()_+-=/
  const handleCropPrediction = async (e) => {
    e.preventDefault();
    // 1. Check all inputs
    const {
      nitrogen,
      potassium,
      phosphorus,
      temperature,
      humidity,
      phValue,
      rainfall,
    } = userInputs;

    if (
      !nitrogen ||
      !potassium ||
      !phosphorus ||
      !temperature ||
      !humidity ||
      !phValue ||
      !rainfall
    ) {
      return toast.error(t('toast_fill_all_inputs'));
    }

    try {
      // 2. Send Request
      const response = await axios.post(
        'https://croppredict-api.herokuapp.com/',
        {
          N: nitrogen,
          P: phosphorus,
          K: potassium,
          temperature,
          humidity,
          ph: phValue,
          rainfall,
        }
      );

      // 3. Render Output
      setSuggestedCrop(response.data.result);

      toast.success(
        `${t('crop_predict_toast_success')} ${t(
          response.data.result
        ).toUpperCase()}`
      );
    } catch (error) {
      axiosErrorHandler(error);
    }
  };
  return (
    <div className="crop-predict">
      <div className="semi-container crop-predict-container">
        <h1 className="page-heading">{t('crop_predict_heading')}</h1>
        <p className="alert">{t('crop_predict_alert_info')}</p>
        <form className="crop-predict-form" onSubmit={handleCropPrediction}>
          <div className="crop-predict-form-inputs-container">
            <InputField
              label={t('nitrogen')}
              type="text"
              placeholder={t('crop_predict_placeholder', {
                element: t('nitrogen'),
              })}
              value={userInputs.nitrogen}
              handleChange={handleUserInputs}
              id="nitrogen"
            />
            <InputField
              label={t('phosphorus')}
              type="text"
              placeholder={t('crop_predict_placeholder', {
                element: t('phosphorus'),
              })}
              value={userInputs.phosphorus}
              handleChange={handleUserInputs}
              id="phosphorus"
            />
            <InputField
              label={t('potassium')}
              type="text"
              placeholder={t('crop_predict_placeholder', {
                element: t('potassium'),
              })}
              value={userInputs.potassium}
              handleChange={handleUserInputs}
              id="potassium"
            />
            <InputField
              label={t('temperature')}
              type="text"
              placeholder={t('crop_predict_placeholder', {
                element: t('temperature'),
              })}
              value={userInputs.temperature}
              handleChange={handleUserInputs}
              id="temperature"
            />
            <InputField
              label={t('humidity')}
              type="text"
              placeholder={t('crop_predict_placeholder', {
                element: t('humidity'),
              })}
              value={userInputs.humidity}
              handleChange={handleUserInputs}
              id="humidity"
            />
            <InputField
              label={t('ph_value')}
              type="text"
              placeholder={t('crop_predict_placeholder', {
                element: t('ph_value'),
              })}
              value={userInputs.phValue}
              handleChange={handleUserInputs}
              id="phValue"
            />
            <InputField
              label={t('rainfall')}
              type="text"
              placeholder={t('crop_predict_placeholder', {
                element: t('rainfall'),
              })}
              value={userInputs.rainfall}
              handleChange={handleUserInputs}
              id="rainfall"
            />
          </div>
          {suggestedCrop && (
            <p className="alert alert-green">
              {t('crop_predict_alert_result')} <br />
              <span className="crop-predict-crop-name">
                {t(`${suggestedCrop}`)}
              </span>
            </p>
          )}
          <div className="crop-predict-form-buttons-container">
            <Button text={t('calculate_crop')} classes="button-primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CropPredictionPage;
