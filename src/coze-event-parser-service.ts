import { Injectable } from '@nestjs/common';

@Injectable()
export class CozeEventParserService {
    parseCozeData(input: string) {
        const trimmedInput = input.trim()
        const json = `[{${trimmedInput
                .replaceAll('\n\n', '},{')
                .replaceAll('\n', '",')
                .replaceAll('event:', '"event":"')
                .replaceAll('data:', '"data":')
            }}]`
        const parsedData = JSON.parse(json)

        return parsedData as Array<{
            event: string
            data: any
        }>;
    }
}
