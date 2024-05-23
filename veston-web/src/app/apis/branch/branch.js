import axios from '@/utils/request';

const prefix = '/resource/branch';

export const searchBranch = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/searchbranch`,
    data,
  });
};

export const updateBranch = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/updatebranch`,
    data,
  });
};

export const insertBranch = (data) => {
  return axios({
    method: 'POST',
    url: `${prefix}/insertbranch`,
    data,
  });
};
