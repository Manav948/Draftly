"use client"

import React, { useEffect } from 'react'
import { Edge } from "reactflow"
import { edgeOptionSchema, EdgeOptionSchema } from '@/schema/edgeOptionsSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '../ui/sheet'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'

import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'

interface Props {
  clickedEdge: Edge | null
  isOpen: boolean
  onSave: (data: EdgeOptionSchema) => void
  onDeleteEdge: (edgeId: string) => void
}

const EdgeOptions = ({
  clickedEdge,
  isOpen,
  onDeleteEdge,
  onSave
}: Props) => {

  const form = useForm<EdgeOptionSchema>({
    resolver: zodResolver(edgeOptionSchema),
    defaultValues: {
      edgeId: "",
      label: "",
      type: "customBeziar",
      animate: false
    }
  })

  useEffect(() => {
    if (isOpen && clickedEdge) {
      form.reset({
        edgeId: clickedEdge.id,
        label: clickedEdge.label?.toString() ?? "",
        animate: clickedEdge.animated ?? false,
        type: (clickedEdge.type as
          | "customBeziar"
          | "customStepRounded"
          | "customStepSharp"
          | "customStraight") ?? "customBeziar"
      })
    }
  }, [isOpen, clickedEdge, form])

  const onSubmit = (data: EdgeOptionSchema) => {
    onSave(data)
  }

  return (
    <SheetContent

      /**
       * ✅ Responsive sizing
       * - mobile: bottom drawer (full width)
       * - tablet: medium drawer
       * - desktop: side panel
       */
      side="right"
      className="
        w-full 
        sm:max-w-[400px]
        md:max-w-[440px]
        p-0 
        flex 
        flex-col
        bg-background
      "
    >

      {/* ✅ HEADER */}
      <SheetHeader className="px-6 pt-6 pb-4 border-b">
        <SheetTitle className="text-xl">
          Edge Settings
        </SheetTitle>

        <SheetDescription className="text-sm">
          Configure your connection style, label, and animation options.
        </SheetDescription>
      </SheetHeader>


      {/* ✅ FORM BODY */}
      <div className="flex-1 overflow-y-auto px-6 py-5">

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >

            {/* LABEL INPUT */}
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter edge label..."
                      className="bg-muted"
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    This text is displayed on the edge.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />


            {/* EDGE TYPE */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edge Style</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose style" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value='customBeziar'>
                        Bezier (Smooth Curve)
                      </SelectItem>

                      <SelectItem value='customStraight'>
                        Straight Line
                      </SelectItem>

                      <SelectItem value='customStepSharp'>
                        Step Sharp
                      </SelectItem>

                      <SelectItem value='customStepRounded'>
                        Step Rounded
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />


            {/* ANIMATE */}
            <FormField
              control={form.control}
              name="animate"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">

                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer">
                      Animated Edge
                    </FormLabel>

                    <FormDescription>
                      Enable flowing animation on the edge
                    </FormDescription>
                  </div>

                </FormItem>
              )}
            />

            {/* SPACER */}
            <div className="h-4" />

            {/* ACTION BUTTONS */}
            <div className="space-y-3">

              <Button
                type="submit"
                className="w-full"
              >
                Save Changes
              </Button>

              <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={() =>
                  onDeleteEdge(form.getValues("edgeId"))
                }
              >
                Delete Edge
              </Button>

            </div>

          </form>
        </Form>

      </div>
    </SheetContent>
  )
}

export default EdgeOptions
