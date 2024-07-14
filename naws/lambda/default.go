package lambda

import (
	"naws/utils"

	"github.com/aws/aws-lambda-go/events"
)

func Hello(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	headers := utils.HandleCORS(req)

	resp := events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "{ \"message\":\"We prolly going to do GO things here\"}",
		Headers:    headers,
	}

	return resp, nil
}
