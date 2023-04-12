import piiiFilters from "piii-filters";
import Piii from "piii";
import filters from "../../database/filters.json";
import specialFilters from "../../database/special-filters.json";

export class OffenseDetector {
  static verify(text: string) {
    const offenses = new Set<string>();
    
    const piii = new Piii({
      filters: [
        ...Object.values(piiiFilters),
        ...Object.values(filters)
      ],
      censor: (badWord: string) => {
        offenses.add(badWord.toLowerCase());
        return badWord;
      }
    });

    piii.filter(text);

    //Fica um pouco mais lento, mas é porque o PIII é uma biblioteca
    //antiga e não suporta espaços nos filtros, então decidi fazer assim
    //mesmo para adicionar mais algumas ofensas.
    const formattedText = " " + text.toLowerCase() + " ";
    specialFilters.map(
      offense => {
        if(formattedText.includes(offense)) {
          offenses.add(offense);
        };
      }
    );

    return Array.from(offenses);
  };
};