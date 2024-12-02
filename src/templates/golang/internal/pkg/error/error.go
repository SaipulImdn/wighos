package error

import "fmt"

func NewError(msg string) error {
	return fmt.Errorf("error: %s", msg)
}
