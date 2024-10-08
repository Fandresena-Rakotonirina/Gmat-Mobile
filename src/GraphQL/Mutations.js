import { gql } from '@apollo/client';

export const ADD_USER = gql`
   mutation addUser($addUserFields: AddUserInput!) {
      addUser(addUserFields: $addUserFields) {
         id
         nom
         prenom
         fonction
         email
         password
         level
         materiels {
            id
            serie
            nombre
            detail {
               id
               type
               marque
               total
            }
         }
      }
   }
`;

export const UPDATE_USER = gql`
   mutation updateUser($id: ID!, $updateUserFields: UpdateUserInput!) {
      updateUser(id: $id, updateUserFields: $updateUserFields) {
         id
         nom
         prenom
         fonction
         email
         password
         level
         materiels {
            serie
            nombre
            detail {
               type
               marque
               total
            }
         }
      }
   }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(id: $userId)
  }
`;

export const ADD_MATERIEL = gql`
   mutation addMateriel($addMaterielFields: AddMaterielInput!) {
      addMateriel(addMaterielFields: $addMaterielFields) {
         id
         serie
         nombre
         detail {
            type
            marque
            total
         }
         user {
            id
            nom
            prenom
            fonction
         }
      }
   }
`;

export const DELETE_MATERIEL = gql`
   mutation deleteMateriel($id: ID!) {
      deleteMateriel(id: $id)
   }
`;

export const UPDATE_MATERIEL = gql`
   mutation updateMateriel(
      $id: ID!
      $updateMaterielFields: UpdateMaterielInput!
   ) {
      updateMateriel(id: $id, updateMaterielFields: $updateMaterielFields) {
         id
         serie
         nombre
         detail {
            type
            marque
            total
         }
         user {
            nom
            prenom
            fonction
         }
      }
   }
`;

export const RENDRE_LIBRE_MATERIEL = gql`
  mutation updateMateriel(
    $id: ID!
    $updateMaterielFields: UpdateMaterielInput!
  ) {
    updateMateriel(id: $id, updateMaterielFields: $updateMaterielFields) {
      id
      serie
      nombre
      detail {
        type
        marque
        total
      }
      user {
        nom
        prenom
        fonction
      }
    }
  }
`;

export const RENDRE_OCCUPER_MATERIEL = gql`
   mutation updateMateriel(
      $id: ID!
      $updateMaterielFields: UpdateMaterielInput!
   ) {
      updateMateriel(id: $id, updateMaterielFields: $updateMaterielFields) {
         id
         serie
         nombre
         detail {
            type
            marque
            total
         }
         user {
            nom
            prenom
            fonction
         }
      }
   }
`;

export const ADD_DETAIL = gql`
   mutation addDetail($addDetailFields: AddDetailInput!) {
      addDetail(addDetailFields: $addDetailFields) {
         id
         type
         marque
         total
         materiels {
            id
            serie
            nombre
            detail {
               id
               type
               marque
               total
            }
            user {
               id
               nom
               prenom
               fonction
            }
         }
      }
   }
`;

export const DELETE_DETAIL = gql`
   mutation deleteDetail($id: ID!) {
      deleteDetail(id: $id)
   }
`;

export const UPDATE_DETAIL = gql`
   mutation updateDetail($id: ID!, $updateMaterielFields: UpdateDetailInput!) {
      updateDetail(id: $id, updateMaterielFields: $updateMaterielFields) {
         id
         type
         marque
         total
         materiels {
            id
            serie
            nombre
         }
      }
   }
`;

export const ADD_TECHNICIEN = gql`
   mutation addTechnicien($addTechnicienFields: AddTechnicienInput!) {
      addTechnicien(addTechnicienFields: $addTechnicienFields) {
         id
         nom
         prenom
         contact
         maintenances {
            id
            serie
            status
            nombre
            detail {
               id
               type
               marque
               total
            }
         }
      }
   }
`;

export const DELETE_TECHNICIEN = gql`
   mutation deleteTechnicien($id: ID!) {
      deleteTechnicien(id: $id)
   }
`;

export const UPDATE_TECHNICIEN = gql`
   mutation updateTechnicien(
      $id: ID!
      $updateTechnicienFields: UpdateTechnicienInput!
   ) {
      updateTechnicien(id: $id, updateTechnicienFields: $updateTechnicienFields) {
         id
         nom
         prenom
         contact
         maintenances {
            id
            serie
            status
            nombre
            detail {
               id
               type
               marque
               total
            }
         }
      }
  }
`;
