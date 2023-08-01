import { RESPONSE_CODE } from "@config/errors";

export const UPLOAD_MEDIA = {
  METHOD: 'post',
  ROUTE: '/media',
  OPERATION: {
    tags: ['Media'],
    summary: '사진을 업로드',
    description: '사진을 새로 업로드합니다.',
    security: [
      {
        Authorization: []
      }
    ],
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: "object",
            required: ['files'],
            properties: {
              files: {
                type: 'array',
                items: {
                  type: 'string',
                  format: 'binary'
                }
              }
            }
          }
        }
      }
    },
    responses: {
      [RESPONSE_CODE.OK]: {
        description: '업로드 완료',
        content: {
           "application/json": {
            schema: {
              type: "object",
              $ref: "#/components/schemas/medium"
            }
           }
        }
      }
    }
  }
}