import { request } from 'undici';

export type SireneCompany = {
  companyName: string;
  addressLine1?: string;
  city?: string;
  postalCode?: string;
};

// Service local de recherche SIRET (simulation pour le moment)
export async function fetchCompanyBySiret(siret: string): Promise<SireneCompany> {
  try {
    // Simulation d'entreprises pour tester
    const mockCompanies: { [key: string]: SireneCompany } = {
      '12345678901234': {
        companyName: 'Entreprise Test SARL',
        addressLine1: '123 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001'
      },
      '98765432109876': {
        companyName: 'Artisan Peinture Martin',
        addressLine1: '456 Avenue des Champs',
        city: 'Lyon',
        postalCode: '69001'
      },
      '11111111111111': {
        companyName: 'Plomberie Dubois & Fils',
        addressLine1: '789 Boulevard Central',
        city: 'Marseille',
        postalCode: '13001'
      },
      '22222222222222': {
        companyName: 'Électricité Moderne SA',
        addressLine1: '321 Rue du Commerce',
        city: 'Bordeaux',
        postalCode: '33000'
      },
      '33333333333333': {
        companyName: 'Maçonnerie Traditionnelle',
        addressLine1: '654 Place du Marché',
        city: 'Toulouse',
        postalCode: '31000'
      }
    };

    // Vérifier si c'est un SIRET de test
    if (mockCompanies[siret]) {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockCompanies[siret];
    }

    // Pour les autres SIRET, essayer l'API officielle
    try {
      const url = `https://entreprise.data.gouv.fr/api/sirene/v3/siret/${encodeURIComponent(siret)}`;
      
      const { body, statusCode } = await request(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Travaux-App/1.0'
        },
      });

      if (statusCode === 404) {
        throw new Error('SIRET not found');
      }
      
      if (statusCode >= 400) {
        throw new Error(`API error: ${statusCode}`);
      }

      const json: any = await body.json();
      
      if (!json || !json.etablissement) {
        throw new Error('Invalid response from API');
      }

      const etablissement = json.etablissement;
      
      const companyName = etablissement?.uniteLegale?.denominationUniteLegale
        || etablissement?.uniteLegale?.nomUniteLegale
        || etablissement?.uniteLegale?.prenom1UniteLegale + ' ' + etablissement?.uniteLegale?.nomUniteLegale
        || 'Entreprise';

      const address = etablissement?.adresseEtablissement;
      const addressLine1 = [
        address?.numeroVoieEtablissement,
        address?.typeVoieEtablissement,
        address?.libelleVoieEtablissement
      ].filter(Boolean).join(' ');

      const city = address?.libelleCommuneEtablissement;
      const postalCode = address?.codePostalEtablissement;

      return {
        companyName: companyName.trim(),
        addressLine1: addressLine1.trim() || undefined,
        city: city || undefined,
        postalCode: postalCode || undefined,
      };

    } catch (apiError) {
      // Si l'API échoue, retourner une entreprise générique
      console.log('API externe échouée, utilisation de données génériques');
      
      return {
        companyName: `Entreprise SIRET ${siret}`,
        addressLine1: 'Adresse non disponible',
        city: 'Ville non disponible',
        postalCode: 'Code postal non disponible'
      };
    }

  } catch (error: any) {
    console.error('Service SIRET error:', error);
    throw new Error('Erreur lors de la recherche de l\'entreprise');
  }
} 